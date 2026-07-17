"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { FieldError, Label, TextField } from "@/components/ui/form";
import { createClient } from "@/lib/supabase/client";
import { validateEmail } from "@/lib/validation";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextEmailError = validateEmail(email);
    setEmailError(nextEmailError);
    if (nextEmailError) return;

    setSubmitting(true);
    const supabase = createClient();
    // Intentionally ignore the result: always show the same success message
    // regardless of whether the address is registered, so this form can't
    // be used to check which emails have an account.
    await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/confirm?type=recovery`,
    });
    setSubmitting(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
          <MaterialIcon name="mark_email_read" filled className="text-4xl" />
        </div>
        <h2 className="mb-3 text-headline-lg font-bold text-text-main">Provjerite email</h2>
        <p className="mb-8 text-body-md text-text-muted">
          Ako je <span className="font-semibold text-text-main">{email}</span> registrovan na MojMajstor.ba, poslali
          smo link za resetovanje lozinke na tu adresu.
        </p>
        <Link href="/prijava" className="font-bold text-primary hover:underline">
          Nazad na prijavu
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-headline-lg font-bold text-text-main">Zaboravili ste lozinku?</h2>
        <p className="mt-2 text-body-md text-text-muted">
          Unesite svoju email adresu i poslat ćemo vam link za resetovanje lozinke.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <TextField
            id="email"
            name="email"
            type="email"
            icon="mail"
            placeholder="vasa@email.com"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            invalid={!!emailError}
          />
          <FieldError>{emailError}</FieldError>
        </div>

        <Button type="submit" size="lg" fullWidth disabled={submitting} className="group">
          {submitting ? (
            <>
              <MaterialIcon name="progress_activity" className="animate-spin" />
              Slanje...
            </>
          ) : (
            <>
              Pošalji link za resetovanje
              <MaterialIcon name="arrow_forward" className="transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-10 text-center">
        <Link href="/prijava" className="text-body-md font-bold text-primary hover:underline">
          Nazad na prijavu
        </Link>
      </div>
    </>
  );
}
