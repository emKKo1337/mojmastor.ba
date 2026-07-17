"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { FieldError, Label, TextField } from "@/components/ui/form";
import { PasswordRequirementsList } from "@/components/sections/PasswordRequirementsList";
import { createClient } from "@/lib/supabase/client";
import { translateAuthError } from "@/lib/auth/errors";
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
  validatePhone,
  validateRequired,
} from "@/lib/validation";
import { cn } from "@/lib/utils";
import type { AccountRole } from "@/types/auth";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

export function RegisterForm({ defaultRole = "korisnik" }: { defaultRole?: AccountRole }) {
  const router = useRouter();
  const [role, setRole] = useState<AccountRole>(defaultRole);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const nextErrors: FormErrors = {
      firstName: validateRequired(firstName, "Ime") ?? undefined,
      lastName: validateRequired(lastName, "Prezime") ?? undefined,
      email: validateEmail(email) ?? undefined,
      phone: validatePhone(phone) ?? undefined,
      password: validatePassword(password) ?? undefined,
      confirmPassword: validatePasswordConfirmation(password, confirmPassword) ?? undefined,
      terms: termsAccepted ? undefined : "Morate prihvatiti uslove korištenja.",
    };
    setErrors(nextErrors);
    return Object.values(nextErrors).every((error) => !error);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    if (!validate()) return;

    setSubmitting(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
        data: {
          role,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone: phone.trim(),
        },
      },
    });
    setSubmitting(false);

    if (error) {
      setFormError(translateAuthError(error.message));
      return;
    }

    router.push(`/provjeri-email?email=${encodeURIComponent(email.trim())}`);
  }

  return (
    <>
      <div className="mb-8 hidden lg:block">
        <h2 className="text-headline-lg font-bold text-text-main">Kreirajte račun</h2>
        <p className="mt-2 text-body-md text-text-muted">Pridružite se MojMajstor.ba zajednici u par koraka.</p>
      </div>

      <div
        role="radiogroup"
        aria-label="Vrsta računa"
        className="mb-8 grid grid-cols-2 gap-3 rounded-xl bg-surface-container-low p-1.5"
      >
        <button
          type="button"
          role="radio"
          aria-checked={role === "korisnik"}
          onClick={() => setRole("korisnik")}
          className={cn(
            "flex items-center justify-center gap-2 rounded-lg py-3 text-label-lg transition-all",
            role === "korisnik" ? "bg-surface-white text-primary shadow-sm" : "text-text-muted",
          )}
        >
          <MaterialIcon name="person" />
          Korisnik
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={role === "majstor"}
          onClick={() => setRole("majstor")}
          className={cn(
            "flex items-center justify-center gap-2 rounded-lg py-3 text-label-lg transition-all",
            role === "majstor" ? "bg-surface-white text-primary shadow-sm" : "text-text-muted",
          )}
        >
          <MaterialIcon name="construction" />
          Majstor
        </button>
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="firstName">Ime</Label>
            <TextField
              id="firstName"
              name="firstName"
              icon="badge"
              placeholder="Amir"
              autoComplete="given-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              invalid={!!errors.firstName}
            />
            <FieldError>{errors.firstName}</FieldError>
          </div>
          <div>
            <Label htmlFor="lastName">Prezime</Label>
            <TextField
              id="lastName"
              name="lastName"
              icon="badge"
              placeholder="Hodžić"
              autoComplete="family-name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              invalid={!!errors.lastName}
            />
            <FieldError>{errors.lastName}</FieldError>
          </div>
        </div>

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
            invalid={!!errors.email}
          />
          <FieldError>{errors.email}</FieldError>
        </div>

        <div>
          <Label htmlFor="phone">Telefon</Label>
          <TextField
            id="phone"
            name="phone"
            type="tel"
            icon="call"
            placeholder="+387 61 234 567"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            invalid={!!errors.phone}
          />
          <FieldError>{errors.phone}</FieldError>
        </div>

        <div>
          <Label htmlFor="password">Lozinka</Label>
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
              invalid={!!errors.password}
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
          <FieldError>{errors.password}</FieldError>
        </div>

        <div>
          <Label htmlFor="confirmPassword">Potvrdi lozinku</Label>
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            icon="lock"
            placeholder="••••••••"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            invalid={!!errors.confirmPassword}
          />
          <FieldError>{errors.confirmPassword}</FieldError>
        </div>

        <div>
          <div className="flex items-start gap-2">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={(event) => setTermsAccepted(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary"
            />
            <label htmlFor="terms" className="select-none text-label-sm text-text-muted">
              Slažem se sa{" "}
              <Link href="/uslovi-koristenja" className="text-primary hover:underline">
                uslovima korištenja
              </Link>{" "}
              i{" "}
              <Link href="/politika-privatnosti" className="text-primary hover:underline">
                politikom privatnosti
              </Link>
              .
            </label>
          </div>
          <FieldError>{errors.terms}</FieldError>
        </div>

        <Button type="submit" size="lg" fullWidth disabled={submitting} className="group">
          {submitting ? (
            <>
              <MaterialIcon name="progress_activity" className="animate-spin" />
              Kreiranje računa...
            </>
          ) : (
            <>
              {role === "majstor" ? "Kreiraj profil majstora" : "Registruj se"}
              <MaterialIcon name="arrow_forward" className="transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-12 text-center">
        <p className="text-body-md text-text-muted">
          Već imate račun?{" "}
          <Link href="/prijava" className="ml-1 font-bold text-primary hover:underline">
            Prijavite se
          </Link>
        </p>
      </div>
    </>
  );
}
