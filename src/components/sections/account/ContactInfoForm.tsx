"use client";

import { useActionState } from "react";
import { updateContactInfoAction } from "@/lib/account/actions";
import { idleState } from "@/lib/action-state";
import { Label, TextField } from "@/components/ui/form";
import { SubmitButton } from "@/components/sections/account/SubmitButton";
import { ActionStatusMessage } from "@/components/sections/account/ActionStatusMessage";

interface ContactInfoFormProps {
  defaultFirstName: string;
  defaultLastName: string;
  defaultPhone: string;
  email: string;
}

export function ContactInfoForm({ defaultFirstName, defaultLastName, defaultPhone, email }: ContactInfoFormProps) {
  const [state, formAction] = useActionState(updateContactInfoAction, idleState);

  return (
    <form action={formAction} className="space-y-6">
      <ActionStatusMessage state={state} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="firstName">Ime</Label>
          <TextField id="firstName" name="firstName" defaultValue={defaultFirstName} autoComplete="given-name" required />
        </div>
        <div>
          <Label htmlFor="lastName">Prezime</Label>
          <TextField id="lastName" name="lastName" defaultValue={defaultLastName} autoComplete="family-name" required />
        </div>
      </div>

      <div>
        <Label htmlFor="phone">Telefon</Label>
        <TextField id="phone" name="phone" type="tel" defaultValue={defaultPhone} autoComplete="tel" required />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <TextField id="email" defaultValue={email} disabled className="opacity-60" />
        <p className="mt-1.5 text-label-sm text-text-muted">Email adresa se ne može mijenjati.</p>
      </div>

      <SubmitButton pendingLabel="Spremanje...">Sačuvaj kontakt informacije</SubmitButton>
    </form>
  );
}
