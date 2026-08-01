# MojMajstor.ba

Marketplace platform connecting korisnici (customers) with majstori (craftsmen) across Bosnia and Herzegovina. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Supabase (Auth, Postgres, Storage).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without Supabase credentials configured, the app runs fully in signed-out mode — public marketplace pages work, and auth-only pages redirect to `/prijava`.

## Connecting Supabase

The app is already wired for Supabase; it just needs a project and its credentials.

1. **Create a project** at [supabase.com](https://supabase.com).
2. **Run the migrations** in `supabase/migrations/`, in order, against your project (via the SQL Editor, or `supabase db push` if using the Supabase CLI):
   - `20260717120000_init_schema.sql` — `profiles`, `craftsman_profiles`, `craftsman_gallery`, `favourites`, RLS policies, the `handle_new_user` trigger that provisions a profile on signup, and the public `craftsman-gallery` Storage bucket.
   - `20260718090000_job_requests.sql` — `job_requests` (the real backend behind `/novi-zahtjev` and every job queue on both dashboards).
   - `20260718100000_messaging.sql` — `conversations` + `messages` (the real backend behind `/poruke`).
   - `20260718110000_public_majstor_profiles.sql` — fixes the `profiles` SELECT policy so anonymous visitors can see majstor profiles (the original policy only allowed authenticated users, which silently hid every majstor from the public marketplace).
   - `20260718120000_admin_verification.sql` — `admin_emails` allowlist table + `set_craftsman_verified()` function backing `/admin/verifikacija`.
3. **Copy `.env.example` to `.env.local`** and fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Project Settings → API. Set `NEXT_PUBLIC_SITE_URL` to your deployed URL in production.

That's enough to run registration, login, email verification, password reset, the majstor profile/gallery editor, job requests, and messaging end-to-end. No `SUPABASE_SERVICE_ROLE_KEY` is needed — every server-side query uses the anon key and relies on Row Level Security.

### Admin access (majstor verification)

`/admin/verifikacija` lets you mark majstori as verified. There's no admin account role — access is granted in two places that both need to agree:

1. In the SQL Editor: `insert into public.admin_emails (email) values ('you@example.com');` — this is what the database actually checks before allowing the mutation.
2. In `.env.local`: `ADMIN_EMAILS=you@example.com` — this only controls whether the app shows the page at all.

### What's still on mock data

The marketplace (`/pretraga`, `/kategorije/[slug]`, `/majstor/[id]`) shows real registered majstori merged alongside the original demo dataset in `src/data/craftsmen.ts`, so it never looks empty while the platform is new. Reviews, ratings, and response times aren't tied to real accounts yet — there's no reviews table — so a real majstor's profile shows 0 reviews honestly rather than an invented rating.

### Email delivery: default vs. custom SMTP

By default, a new Supabase project sends auth emails (signup confirmation, password reset) through Supabase's own shared email service. Two things about that matter here:

- **It's rate-limited and low-volume.** Fine for light manual testing, not for real usage — expect to hit "too many requests" after a handful of emails in a short window. Anything beyond a few test signups needs a custom SMTP provider connected (Authentication → Settings → SMTP Settings), e.g. [Resend](https://resend.com).
- **Its email templates aren't editable** until a custom SMTP provider is connected. The dashboard's Email Templates page is locked to the default template while running on the shared service.

`src/app/auth/confirm/route.ts` handles both situations without any dashboard changes:
- On the **default service**, its email links route through Supabase's own hosted `/auth/v1/verify` endpoint, which redirects back here with a PKCE `?code=...` — the route exchanges it via `exchangeCodeForSession`. **Known limitation of this path:** the link must be opened in the *same browser* the signup/reset was started in, since the PKCE code verifier lives in a cookie set at that time. Opening the email on a different device or browser than you registered from will land on the "link nevažeći" error page even though nothing is actually wrong.
- Once **custom SMTP is connected**, you gain the option (not a requirement) to edit the email templates so the links point directly at this app instead of through Supabase's verify endpoint — set the "Confirm signup" and "Reset password" template links to:
  - `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`
  - `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery`

  The route verifies these via `verifyOtp` instead, which has no same-browser requirement and is the more robust path for production. Recommended once SMTP is set up, but the app works correctly either way.

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
