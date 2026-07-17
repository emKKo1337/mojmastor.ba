import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "@/components/layout/AuthShell";
import { CheckEmailNotice } from "@/components/sections/CheckEmailNotice";

export const metadata: Metadata = {
  title: "Potvrdite email",
  robots: { index: false, follow: false },
};

export default function ProvjeriEmailPage() {
  return (
    <AuthShell>
      <Suspense>
        <CheckEmailNotice />
      </Suspense>
    </AuthShell>
  );
}
