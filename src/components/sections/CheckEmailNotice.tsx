"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { translateAuthError } from "@/lib/auth/errors";

type ResendStatus = "idle" | "sending" | "sent" | "error";

export function CheckEmailNotice() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [status, setStatus] = useState<ResendStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleResend() {
    if (!email) return;
    setStatus("sending");
    setError(null);

    const supabase = createClient();
    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/confirm` },
    });

    if (resendError) {
      setError(translateAuthError(resendError.message));
      setStatus("error");
      return;
    }
    setStatus("sent");
  }

  return (
    <div className="text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <MaterialIcon name="mark_email_unread" className="text-4xl" />
      </div>
      <h2 className="mb-3 text-headline-lg font-bold text-text-main">Potvrdite svoju email adresu</h2>
      <p className="mb-2 text-body-md text-text-muted">
        Poslali smo link za potvrdu na{" "}
        {email ? <span className="font-semibold text-text-main">{email}</span> : "vašu email adresu"}.
      </p>
      <p className="mb-8 text-body-md text-text-muted">
        Kliknite na link u emailu da biste aktivirali svoj račun. Ako ga ne vidite, provjerite i folder za neželjenu
        poštu (spam).
      </p>

      {email ? (
        <div className="mb-8">
          {status === "sent" ? (
            <p className="flex items-center justify-center gap-2 text-label-lg text-secondary">
              <MaterialIcon name="check_circle" filled />
              Email je ponovo poslan.
            </p>
          ) : (
            <Button type="button" variant="outline" onClick={handleResend} disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  <MaterialIcon name="progress_activity" className="animate-spin" />
                  Slanje...
                </>
              ) : (
                "Pošalji ponovo"
              )}
            </Button>
          )}
          {error ? <p className="mt-3 text-label-sm text-error">{error}</p> : null}
        </div>
      ) : null}

      <Link href="/prijava" className="font-bold text-primary hover:underline">
        Nazad na prijavu
      </Link>
    </div>
  );
}
