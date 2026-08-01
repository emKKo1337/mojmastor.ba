"use client";

import { useActionState } from "react";
import { toggleVerificationAction } from "@/lib/admin/actions";
import { idleState } from "@/lib/action-state";
import { SubmitButton } from "@/components/sections/account/SubmitButton";

export function VerificationToggle({ profileId, verified }: { profileId: string; verified: boolean }) {
  const [state, action] = useActionState(toggleVerificationAction, idleState);

  return (
    <form action={action}>
      <input type="hidden" name="profileId" value={profileId} />
      <input type="hidden" name="nextValue" value={String(!verified)} />
      {state.status === "error" && state.message ? (
        <p role="alert" className="mb-1 text-label-sm text-error">
          {state.message}
        </p>
      ) : null}
      <SubmitButton pendingLabel="..." variant={verified ? "outline" : "primary"} size="sm">
        {verified ? "Ukloni verifikaciju" : "Verifikuj"}
      </SubmitButton>
    </form>
  );
}
