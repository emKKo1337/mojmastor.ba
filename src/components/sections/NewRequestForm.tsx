"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { Label, Select, TextArea, TextField } from "@/components/ui/form";
import { SubmitButton } from "@/components/sections/account/SubmitButton";
import { createJobRequestAction } from "@/lib/job-requests/actions";
import { idleState } from "@/lib/action-state";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";

export function NewRequestForm() {
  const router = useRouter();
  const [state, formAction] = useActionState(createJobRequestAction, idleState);

  useEffect(() => {
    if (state.status === "success") {
      const timeout = window.setTimeout(() => {
        router.push("/nadzorna-ploca/zahtjevi");
        router.refresh();
      }, 1800);
      return () => window.clearTimeout(timeout);
    }
  }, [state, router]);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl bg-surface-white p-12 text-center shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
          <MaterialIcon name="check_circle" filled className="text-4xl" />
        </div>
        <h2 className="text-headline-md">Vaš zahtjev je uspješno poslan!</h2>
        <p className="max-w-md text-body-md text-text-muted">
          Majstori iz Vaše okoline će uskoro pregledati zahtjev. Obavijestit ćemo Vas čim neko prihvati posao.
        </p>
        <Button href="/nadzorna-ploca/zahtjevi" size="lg" className="mt-2">
          Idi na moje zahtjeve
        </Button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.status === "error" && state.message ? (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg bg-error-container px-4 py-3 text-label-sm text-on-error-container"
        >
          <MaterialIcon name="error" className="mt-0.5 text-[18px]" />
          {state.message}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-surface-white/80 p-8 shadow-sm backdrop-blur-md md:col-span-2">
          <Label htmlFor="naslov">Naslov zahtjeva</Label>
          <TextField id="naslov" name="naslov" required placeholder="Npr. Popravka slavine u kupatilu" className="mb-6" />
          <Label htmlFor="opis">Opis problema</Label>
          <TextArea id="opis" name="opis" required rows={5} placeholder="Detaljno opišite kvar ili uslugu koju trebate..." />
        </div>

        <div className="rounded-xl bg-surface-white/80 p-8 shadow-sm backdrop-blur-md md:col-span-2">
          <Label htmlFor="kategorija">Usluga</Label>
          <Select id="kategorija" name="kategorija" defaultValue="" required>
            <option value="" disabled>
              Odaberite uslugu
            </option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="rounded-xl bg-surface-white/80 p-8 shadow-sm backdrop-blur-md">
          <Label htmlFor="budzet">Planirani budžet (KM)</Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-body-md text-text-muted">KM</span>
            <TextField id="budzet" name="budzet" type="number" min={0} placeholder="0.00" className="pl-12" />
          </div>
        </div>

        <div className="rounded-xl bg-surface-white/80 p-8 shadow-sm backdrop-blur-md">
          <Label htmlFor="datum">Željeni datum</Label>
          <TextField id="datum" name="datum" type="date" icon="calendar_today" />
        </div>

        <div className="rounded-xl bg-surface-white/80 p-8 shadow-sm backdrop-blur-md">
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

        <div className="rounded-xl bg-surface-white/80 p-8 shadow-sm backdrop-blur-md">
          <Label htmlFor="naselje">Naselje (opciono)</Label>
          <TextField id="naselje" name="naselje" placeholder="Npr. Centar" />
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-surface-white/80 p-8 shadow-sm backdrop-blur-md md:col-span-2">
          <input
            id="hitno"
            name="hitno"
            type="checkbox"
            className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary"
          />
          <Label htmlFor="hitno" className="mb-0">
            Ovo je hitan zahtjev
          </Label>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-6 pt-8 md:flex-row">
        <div className="flex items-center gap-3 text-text-muted">
          <MaterialIcon name="verified_user" filled className="text-secondary" />
          <span className="text-label-sm">Vaši podaci su sigurni i zaštićeni.</span>
        </div>
        <SubmitButton pendingLabel="Slanje..." size="lg" fullWidth className="md:w-auto">
          Pošalji zahtjev
          <MaterialIcon name="send" />
        </SubmitButton>
      </div>
    </form>
  );
}
