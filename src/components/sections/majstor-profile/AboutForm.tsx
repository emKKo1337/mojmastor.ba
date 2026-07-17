"use client";

import { useActionState } from "react";
import { updateAboutAction } from "@/lib/majstor/actions";
import { idleState } from "@/lib/action-state";
import { Label, TextArea, TextField } from "@/components/ui/form";
import { SubmitButton } from "@/components/sections/account/SubmitButton";
import { ActionStatusMessage } from "@/components/sections/account/ActionStatusMessage";

interface AboutFormProps {
  defaultHeadline: string;
  defaultBio: string;
  defaultYearsExperience: number;
  defaultHourlyRateFrom: number | null;
}

export function AboutForm({ defaultHeadline, defaultBio, defaultYearsExperience, defaultHourlyRateFrom }: AboutFormProps) {
  const [state, formAction] = useActionState(updateAboutAction, idleState);

  return (
    <form action={formAction} className="space-y-6">
      <ActionStatusMessage state={state} />

      <div>
        <Label htmlFor="headline">Zanimanje / naslov</Label>
        <TextField
          id="headline"
          name="headline"
          defaultValue={defaultHeadline}
          placeholder="npr. Vodoinstalater sa 10 godina iskustva"
          required
        />
      </div>

      <div>
        <Label htmlFor="bio">O meni</Label>
        <TextArea
          id="bio"
          name="bio"
          rows={5}
          defaultValue={defaultBio}
          placeholder="Opišite svoje iskustvo i usluge koje nudite..."
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="yearsExperience">Godine iskustva</Label>
          <TextField
            id="yearsExperience"
            name="yearsExperience"
            type="number"
            min={0}
            max={80}
            defaultValue={defaultYearsExperience}
          />
        </div>
        <div>
          <Label htmlFor="hourlyRateFrom">Cijena od (KM/h)</Label>
          <TextField
            id="hourlyRateFrom"
            name="hourlyRateFrom"
            type="number"
            min={0}
            step="0.01"
            defaultValue={defaultHourlyRateFrom ?? ""}
            placeholder="npr. 20"
          />
        </div>
      </div>

      <SubmitButton pendingLabel="Spremanje...">Sačuvaj podatke</SubmitButton>
    </form>
  );
}
