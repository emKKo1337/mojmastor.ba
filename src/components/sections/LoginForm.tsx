"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { Label, TextField } from "@/components/ui/form";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => setSubmitting(false), 1200);
  }

  return (
    <>
      <div className="mb-10 hidden lg:block">
        <h2 className="text-headline-lg font-bold text-text-main">Prijavite se</h2>
        <p className="mt-2 text-body-md text-text-muted">Unesite svoje podatke za pristup profilu.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email">E-mail adresa</Label>
          <TextField id="email" name="email" type="email" required icon="mail" placeholder="vasa@email.com" />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label htmlFor="password" className="mb-0">
              Lozinka
            </Label>
            <a href="/zaboravljena-lozinka" className="text-label-sm text-primary hover:underline">
              Zaboravili ste lozinku?
            </a>
          </div>
          <div className="relative">
            <TextField
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              icon="lock"
              placeholder="••••••••"
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-text-muted hover:text-text-main"
              aria-label={showPassword ? "Sakrij lozinku" : "Prikaži lozinku"}
            >
              <MaterialIcon name={showPassword ? "visibility_off" : "visibility"} />
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary"
          />
          <label htmlFor="remember-me" className="ml-2 select-none text-label-sm text-text-muted">
            Zapamti me na ovom uređaju
          </label>
        </div>

        <Button type="submit" size="lg" fullWidth disabled={submitting} className="group">
          {submitting ? (
            <>
              <MaterialIcon name="progress_activity" className="animate-spin" />
              Prijavljivanje...
            </>
          ) : (
            <>
              Prijavi se
              <MaterialIcon name="arrow_forward" className="transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>

      <div className="relative my-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border-light" />
        </div>
        <div className="relative flex justify-center text-label-sm uppercase">
          <span className="bg-surface-white px-4 text-text-muted">Ili nastavite sa</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex h-[52px] items-center justify-center gap-2 rounded-lg border border-border-light transition-colors duration-200 hover:bg-surface-container-low"
        >
          <GoogleIcon />
          <span className="text-label-sm text-text-main">Google</span>
        </button>
        <button
          type="button"
          className="flex h-[52px] items-center justify-center gap-2 rounded-lg border border-border-light transition-colors duration-200 hover:bg-surface-container-low"
        >
          <FacebookIcon />
          <span className="text-label-sm text-text-main">Facebook</span>
        </button>
      </div>

      <div className="mt-12 text-center">
        <p className="text-body-md text-text-muted">
          Nemate korisnički račun?{" "}
          <Link href="/registracija" className="ml-1 font-bold text-primary hover:underline">
            Registruj se
          </Link>
        </p>
      </div>
    </>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        fill="#1877F2"
      />
    </svg>
  );
}
