"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { SubmitButton } from "@/components/sections/account/SubmitButton";
import {
  acceptJobRequestAction,
  cancelJobRequestAction,
  completeJobRequestAction,
  declineJobRequestAction,
} from "@/lib/job-requests/actions";
import { idleState } from "@/lib/action-state";

/** Accept / decline pair shown on a majstor's "Novi poslovi" queue. */
export function AcceptDeclineActions({ jobId }: { jobId: string }) {
  const [acceptState, acceptAction] = useActionState(acceptJobRequestAction, idleState);
  const [declineState, declineAction] = useActionState(declineJobRequestAction, idleState);
  const errorMessage =
    (acceptState.status === "error" && acceptState.message) || (declineState.status === "error" && declineState.message);

  return (
    <div className="flex w-full flex-col gap-2">
      {errorMessage ? (
        <p role="alert" className="text-label-sm text-error">
          {errorMessage}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <form action={acceptAction} className="flex-1">
          <input type="hidden" name="jobId" value={jobId} />
          <SubmitButton pendingLabel="Prihvatanje..." fullWidth>
            Prihvati posao
          </SubmitButton>
        </form>
        <form action={declineAction}>
          <input type="hidden" name="jobId" value={jobId} />
          <SubmitButton pendingLabel="..." variant="outline">
            Odbij
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}

/** "Označi kao završeno" + link to poruke, shown on a majstor's "Aktivni poslovi". */
export function CompleteJobAction({ jobId }: { jobId: string }) {
  const [state, action] = useActionState(completeJobRequestAction, idleState);

  return (
    <>
      {state.status === "error" && state.message ? (
        <p role="alert" className="w-full text-label-sm text-error">
          {state.message}
        </p>
      ) : null}
      <form action={action} className="flex-1">
        <input type="hidden" name="jobId" value={jobId} />
        <SubmitButton pendingLabel="Ažuriranje..." fullWidth>
          Označi kao završeno
        </SubmitButton>
      </form>
      <Button href="/poruke" variant="outline" className="flex-1">
        Pošalji poruku
      </Button>
    </>
  );
}

/** "Otkaži zahtjev", shown on a korisnik's own pending request in "Moji zahtjevi". */
export function CancelRequestAction({ jobId }: { jobId: string }) {
  const [state, action] = useActionState(cancelJobRequestAction, idleState);

  return (
    <form action={action}>
      <input type="hidden" name="jobId" value={jobId} />
      {state.status === "error" && state.message ? (
        <p role="alert" className="mb-2 text-label-sm text-error">
          {state.message}
        </p>
      ) : null}
      <SubmitButton pendingLabel="Otkazivanje..." variant="outline">
        Otkaži zahtjev
      </SubmitButton>
    </form>
  );
}
