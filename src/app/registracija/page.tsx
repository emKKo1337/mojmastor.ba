import type { Metadata } from "next";
import { AuthShell } from "@/components/layout/AuthShell";
import { RegisterForm } from "@/components/sections/RegisterForm";

export const metadata: Metadata = {
  title: "Registracija",
  description: "Kreirajte besplatan MojMajstor.ba račun kao korisnik ili kao majstor i počnite već danas.",
};

interface RegistracijaPageProps {
  searchParams: Promise<{ tip?: string }>;
}

export default async function RegistracijaPage({ searchParams }: RegistracijaPageProps) {
  const { tip } = await searchParams;
  const defaultRole = tip === "majstor" ? "majstor" : "korisnik";

  return (
    <AuthShell>
      <RegisterForm defaultRole={defaultRole} />
    </AuthShell>
  );
}
