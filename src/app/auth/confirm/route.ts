import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

/**
 * Destination for the links Supabase Auth emails out for both signup
 * confirmation and password recovery.
 *
 * Handles two possible shapes, because which one arrives depends on the
 * Supabase project's email template configuration:
 *
 * 1. `token_hash` + `type` — produced by a *custom* "Confirm signup" /
 *    "Reset password" template pointed directly at
 *    `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`
 *    (or `type=recovery`). Verified via `verifyOtp`. This is the preferred
 *    path once a custom SMTP provider (e.g. Resend) is connected, since the
 *    Supabase dashboard only allows editing email templates when a custom
 *    SMTP provider is configured — the default shared email service is
 *    locked to its built-in template.
 * 2. `code` — produced by the *default* Supabase template, which routes
 *    through Supabase's own hosted `/auth/v1/verify` endpoint first; that
 *    endpoint redirects here with a PKCE auth code instead. Verified via
 *    `exchangeCodeForSession`. This is what fires today, since the project
 *    is still on the default email service. Note: this path requires the
 *    link to be opened in the *same browser* the signup/reset was started
 *    in (the PKCE code verifier lives in a cookie set at that time) — a
 *    real limitation of the default-template flow that goes away once a
 *    custom "token_hash" template is in use.
 *
 * `?error=...&error_code=...&error_description=...` is also possible
 * (Supabase's hosted verify endpoint rejected the token, e.g. expired or
 * already used) — that case falls through to /auth/greska below.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  const supabase = await createClient();
  let verified = false;

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    verified = !error;
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    verified = !error;
  }

  if (verified) {
    const destination = type === "recovery" ? "/reset-lozinke" : next;
    return NextResponse.redirect(new URL(destination, origin));
  }

  return NextResponse.redirect(new URL("/auth/greska", origin));
}
