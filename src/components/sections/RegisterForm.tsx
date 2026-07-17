"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { Label, Select, TextField } from "@/components/ui/form";
import { cities } from "@/data/cities";
import { cn } from "@/lib/utils";

type Role = "customer" | "craftsman";

export function RegisterForm({ defaultRole = "customer" }: { defaultRole?: Role }) {
  const [role, setRole] = useState<Role>(defaultRole);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => setSubmitting(false), 1200);
  }

  return (
    <>
      <div className="mb-8 hidden lg:block">
        <h2 className="text-headline-lg font-bold text-text-main">Kreirajte račun</h2>
        <p className="mt-2 text-body-md text-text-muted">Pridružite se MojMajstor.ba zajednici u par koraka.</p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3 rounded-xl bg-surface-container-low p-1.5">
        <button
          type="button"
          onClick={() => setRole("customer")}
          className={cn(
            "flex items-center justify-center gap-2 rounded-lg py-3 text-label-lg transition-all",
            role === "customer" ? "bg-surface-white text-primary shadow-sm" : "text-text-muted",
          )}
        >
          <MaterialIcon name="person" />
          Tražim majstora
        </button>
        <button
          type="button"
          onClick={() => setRole("craftsman")}
          className={cn(
            "flex items-center justify-center gap-2 rounded-lg py-3 text-label-lg transition-all",
            role === "craftsman" ? "bg-surface-white text-primary shadow-sm" : "text-text-muted",
          )}
        >
          <MaterialIcon name="construction" />
          Ja sam majstor
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="fullName">Ime i prezime</Label>
          <TextField id="fullName" name="fullName" required icon="badge" placeholder="Ime i prezime" />
        </div>

        <div>
          <Label htmlFor="email">E-mail adresa</Label>
          <TextField id="email" name="email" type="email" required icon="mail" placeholder="vasa@email.com" />
        </div>

        <div>
          <Label htmlFor="grad">Grad</Label>
          <Select id="grad" name="grad" defaultValue="" required>
            <option value="" disabled>
              Odaberite grad
            </option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </Select>
        </div>

        {role === "craftsman" ? (
          <div>
            <Label htmlFor="zanimanje">Zanimanje</Label>
            <TextField id="zanimanje" name="zanimanje" icon="handyman" placeholder="Npr. Vodoinstalater" />
          </div>
        ) : null}

        <div>
          <Label htmlFor="password">Lozinka</Label>
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

        <div className="flex items-start gap-2">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
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

        <Button type="submit" size="lg" fullWidth disabled={submitting} className="group">
          {submitting ? (
            <>
              <MaterialIcon name="progress_activity" className="animate-spin" />
              Kreiranje računa...
            </>
          ) : (
            <>
              {role === "craftsman" ? "Kreiraj profil majstora" : "Registruj se"}
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
