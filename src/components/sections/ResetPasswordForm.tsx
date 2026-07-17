"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { FieldError, Label, TextField } from "@/components/ui/form";
import { PasswordRequirementsList } from "@/components/sections/PasswordRequirementsList";
import { createClient } from "@/lib/supabase/client";
import { translateAuthError } from "@/lib/auth/errors";
import { validatePassword, validatePasswordConfirmation } from "@/lib/validation";

export function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const nextPasswordError = validatePassword(password);
    const nextConfirmError = validatePasswordConfirmation(password, confirmPassword);
    setPasswordError(nextPasswordError);
    setConfirmError(nextConfirmError);
    if (nextPasswordError || nextConfirmError) return;

    setSubmitting(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setSubmitting(false);

    if (error) {
      setFormError(translateAuthError(error.message));
      return;
    }

    setSuccess(true);
    window.setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 2000);
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
          <MaterialIcon name="check_circle" filled className="text-4xl" />
        </div>
        <h2 className="mb-3 text-headline-lg font-bold text-text-main">Lozinka je promijenjena</h2>
        <p className="text-body-md text-text-muted">Preusmjeravamo vas na početnu stranicu...</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-headline-lg font-bold text-text-main">Postavite novu lozinku</h2>
        <p className="mt-2 text-body-md text-text-muted">Unesite novu lozinku za svoj MojMajstor.ba račun.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {formError ? (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg bg-error-container px-4 py-3 text-label-sm text-on-error-container"
          >
            <MaterialIcon name="error" className="mt-0.5 text-[18px]" />
            {formError}
          </div>
        ) : null}

        <div>
          <Label htmlFor="password">Nova lozinka</Label>
          <div className="relative">
            <TextField
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              icon="lock"
              placeholder="••••••••"
              autoComplete="new-password"
              className="pr-12"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              invalid={!!passwordError}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-text-muted hover:text-text-main"
              aria-label={showPassword ? "Sakrij lozinku" : "Prikaži lozinku"}
            >
              <MaterialIcon name={showPassword ? "visibility_off" : "visibility"} />
            </button>
          </div>
          {password ? <PasswordRequirementsList password={password} /> : null}
          <FieldError>{passwordError}</FieldError>
        </div>

        <div>
          <Label htmlFor="confirmPassword">Potvrdi novu lozinku</Label>
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            icon="lock"
            placeholder="••••••••"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            invalid={!!confirmError}
          />
          <FieldError>{confirmError}</FieldError>
        </div>

        <Button type="submit" size="lg" fullWidth disabled={submitting} className="group">
          {submitting ? (
            <>
              <MaterialIcon name="progress_activity" className="animate-spin" />
              Spremanje...
            </>
          ) : (
            <>
              Postavi novu lozinku
              <MaterialIcon name="arrow_forward" className="transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>
    </>
  );
}
