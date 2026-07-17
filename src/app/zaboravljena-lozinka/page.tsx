import type { Metadata } from "next";
import { AuthShell } from "@/components/layout/AuthShell";
import { ForgotPasswordForm } from "@/components/sections/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Zaboravljena lozinka",
  description: "Resetujte lozinku za svoj MojMajstor.ba račun.",
};

export default function ZaboravljenaLozinkaPage() {
  return (
    <AuthShell>
      <ForgotPasswordForm />
    </AuthShell>
  );
}
