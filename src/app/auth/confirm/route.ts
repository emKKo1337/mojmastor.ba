import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

/**
 * Destination for the links Supabase Auth emails out for both signup
 * confirmation and password recovery. Configure the "Confirm signup" and
 * "Reset password" email templates in the Supabase dashboard to point at
 * `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email` (or
 * `type=recovery`) — see the setup notes in the project README.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (tokenHash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });

    if (!error) {
      const destination = type === "recovery" ? "/reset-lozinke" : next;
      return NextResponse.redirect(new URL(destination, origin));
    }
  }

  return NextResponse.redirect(new URL("/auth/greska", origin));
}
