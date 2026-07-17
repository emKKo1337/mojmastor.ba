import type { Metadata } from "next";
import { AuthShell } from "@/components/layout/AuthShell";
import { LoginForm } from "@/components/sections/LoginForm";

export const metadata: Metadata = {
  title: "Prijava",
  description: "Prijavite se na svoj MojMajstor.ba račun i nastavite tamo gdje ste stali.",
};

export default function PrijavaPage() {
  return (
    <AuthShell>
      <LoginForm />
    </AuthShell>
  );
}
