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
2. **Run the migration** in `supabase/migrations/20260717120000_init_schema.sql` against your project (via the SQL Editor, or `supabase db push` if using the Supabase CLI). It creates the `profiles`, `craftsman_profiles`, `craftsman_gallery`, and `favourites` tables with Row Level Security policies, the `handle_new_user` trigger that provisions a profile on signup, and the public `craftsman-gallery` Storage bucket.
3. **Copy `.env.example` to `.env.local`** and fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Project Settings → API. Set `NEXT_PUBLIC_SITE_URL` to your deployed URL in production.
4. **Configure email templates** (Authentication → Email Templates in the Supabase dashboard) so confirmation and password-reset links point at this app's confirmation route instead of Supabase's default:
   - **Confirm signup** template: set the link to `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`
   - **Reset password** template: set the link to `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery`

Once these are set, registration, login, email verification, password reset, and the majstor profile/gallery editor all work end-to-end. No `SUPABASE_SERVICE_ROLE_KEY` is needed — every server-side query uses the anon key and relies on Row Level Security.

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
