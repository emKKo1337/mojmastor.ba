"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { deleteGalleryImageAction, uploadGalleryImageAction } from "@/lib/majstor/actions";
import { idleState } from "@/lib/action-state";
import { Label, TextField } from "@/components/ui/form";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { SubmitButton } from "@/components/sections/account/SubmitButton";
import { ActionStatusMessage } from "@/components/sections/account/ActionStatusMessage";
import type { GalleryImage } from "@/types/auth";

function DeleteImageButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-label="Obriši fotografiju"
      className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 disabled:opacity-100"
    >
      <MaterialIcon
        name={pending ? "progress_activity" : "delete"}
        className={pending ? "animate-spin text-[18px]" : "text-[18px]"}
      />
    </button>
  );
}

function GalleryImageCard({ image }: { image: GalleryImage }) {
  const [state, formAction] = useActionState(deleteGalleryImageAction, idleState);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border-light bg-surface-container-low">
      <Image
        src={image.publicUrl}
        alt={image.caption || "Fotografija iz galerije"}
        width={300}
        height={300}
        className="h-40 w-full object-cover"
      />
      <form action={formAction} className="absolute right-2 top-2">
        <input type="hidden" name="imageId" value={image.id} />
        <input type="hidden" name="storagePath" value={image.storagePath} />
        <DeleteImageButton />
      </form>
      {state.status === "error" && state.message ? (
        <p role="alert" className="absolute inset-x-0 bottom-0 bg-error-container px-2 py-1 text-[11px] text-on-error-container">
          {state.message}
        </p>
      ) : null}
    </div>
  );
}

export function GalleryManager({ images }: { images: GalleryImage[] }) {
  const [uploadState, uploadAction] = useActionState(uploadGalleryImageAction, idleState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (uploadState.status === "success") formRef.current?.reset();
  }, [uploadState]);

  return (
    <div className="space-y-6">
      <ActionStatusMessage state={uploadState} />

      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {images.map((image) => (
            <GalleryImageCard key={image.id} image={image} />
          ))}
        </div>
      ) : (
        <p className="text-body-md text-text-muted">Još niste dodali fotografije u galeriju.</p>
      )}

      <form ref={formRef} action={uploadAction} className="space-y-4 rounded-xl border border-dashed border-border-light p-6">
        <div>
          <Label htmlFor="file">Nova fotografija</Label>
          <input
            id="file"
            name="file"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required
            className="block w-full text-body-md text-text-muted file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-label-sm file:text-on-primary file:transition-colors hover:file:bg-primary-container"
          />
          <p className="mt-1.5 text-label-sm text-text-muted">JPG, PNG ili WEBP, maksimalno 8 MB.</p>
        </div>
        <div>
          <Label htmlFor="caption">Opis (opciono)</Label>
          <TextField id="caption" name="caption" placeholder="npr. Zamjena instalacija u kupatilu" />
        </div>
        <SubmitButton pendingLabel="Slanje...">Dodaj fotografiju</SubmitButton>
      </form>
    </div>
  );
}
