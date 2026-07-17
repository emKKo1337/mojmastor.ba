"use client";

import { useActionState, useState } from "react";
import { updatePasswordAction } from "@/lib/account/actions";
import { idleState, type ActionState } from "@/lib/action-state";
import { Label, TextField } from "@/components/ui/form";
import { PasswordRequirementsList } from "@/components/sections/PasswordRequirementsList";
import { SubmitButton } from "@/components/sections/account/SubmitButton";
import { ActionStatusMessage } from "@/components/sections/account/ActionStatusMessage";

function PasswordFields() {
  const [password, setPassword] = useState("");
  return (
    <>
      <div>
        <Label htmlFor="password">Nova lozinka</Label>
        <TextField
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {password ? <PasswordRequirementsList password={password} /> : null}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Potvrdi novu lozinku</Label>
        <TextField id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" />
      </div>
    </>
  );
}

export function PasswordForm() {
  const [state, formAction] = useActionState(updatePasswordAction, idleState);

  // Remount the fields (clearing them) exactly once per successful submission —
  // adjusting state during render, per https://react.dev/reference/react/useState#storing-information-from-previous-renders,
  // rather than in an effect.
  const [prevState, setPrevState] = useState<ActionState>(state);
  const [formVersion, setFormVersion] = useState(0);
  if (state !== prevState) {
    setPrevState(state);
    if (state.status === "success") setFormVersion((version) => version + 1);
  }

  return (
    <form action={formAction} className="space-y-6">
      <ActionStatusMessage state={state} />
      <PasswordFields key={formVersion} />
      <SubmitButton pendingLabel="Spremanje...">Promijeni lozinku</SubmitButton>
    </form>
  );
}
