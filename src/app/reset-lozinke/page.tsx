import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/layout/AuthShell";
import { ResetPasswordForm } from "@/components/sections/ResetPasswordForm";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Nova lozinka",
  description: "Postavite novu lozinku za svoj MojMajstor.ba račun.",
};

export default async function ResetLozinkePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Reached only via the link in a password-reset email, which establishes
  // a temporary recovery session through /auth/confirm. No session means
  // this page was opened directly or the link already expired.
  if (!user) {
    redirect("/auth/greska");
  }

  return (
    <AuthShell>
      <ResetPasswordForm />
    </AuthShell>
  );
}
