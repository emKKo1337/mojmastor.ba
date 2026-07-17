import type { Metadata } from "next";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/Button";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export const metadata: Metadata = {
  title: "Link nije važeći",
  robots: { index: false, follow: false },
};

export default function AuthGreskaPage() {
  return (
    <AuthShell>
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-error-container text-error">
          <MaterialIcon name="link_off" className="text-4xl" />
        </div>
        <h2 className="mb-3 text-headline-lg font-bold text-text-main">Link je istekao ili je nevažeći</h2>
        <p className="mb-8 text-body-md text-text-muted">
          Ovaj link za potvrdu ili resetovanje lozinke više nije važeći. Zatražite novi i pokušajte ponovo.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href="/zaboravljena-lozinka" variant="outline" size="lg">
            Zatraži novi link
          </Button>
          <Button href="/prijava" size="lg">
            Nazad na prijavu
          </Button>
        </div>
      </div>
    </AuthShell>
  );
}
