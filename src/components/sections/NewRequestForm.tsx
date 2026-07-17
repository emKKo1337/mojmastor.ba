"use client";

import { useRef, useState, type DragEvent, type FormEvent } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { Label, Select, TextArea, TextField } from "@/components/ui/form";
import { cities } from "@/data/cities";
import { cn } from "@/lib/utils";

type SubmitState = "idle" | "submitting" | "success";

export function NewRequestForm() {
  const [photos, setPhotos] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [state, setState] = useState<SubmitState>("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    setPhotos((prev) => [...prev, ...Array.from(fileList)]);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    addFiles(event.dataTransfer.files);
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    window.setTimeout(() => {
      setState("success");
    }, 1200);
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl bg-surface-white p-12 text-center shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
          <MaterialIcon name="check_circle" filled className="text-4xl" />
        </div>
        <h2 className="text-headline-md">Vaš zahtjev je uspješno poslan!</h2>
        <p className="max-w-md text-body-md text-text-muted">
          Majstori iz Vaše okoline će uskoro pregledati zahtjev i poslati Vam svoje ponude. Obavijestit ćemo Vas
          čim stigne prva ponuda.
        </p>
        <Button href="/nadzorna-ploca" size="lg" className="mt-2">
          Idi na nadzornu ploču
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-surface-white/80 p-8 shadow-sm backdrop-blur-md md:col-span-2">
          <Label htmlFor="naslov">Naslov zahtjeva</Label>
          <TextField id="naslov" name="naslov" required placeholder="Npr. Popravka slavine u kupatilu" className="mb-6" />
          <Label htmlFor="opis">Opis problema</Label>
          <TextArea id="opis" name="opis" required rows={5} placeholder="Detaljno opišite kvar ili uslugu koju trebate..." />
        </div>

        <div className="rounded-xl bg-surface-white/80 p-8 shadow-sm backdrop-blur-md md:col-span-2">
          <Label>Dodaj fotografije</Label>
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") fileInputRef.current?.click();
            }}
            onDragOver={(event) => {
              event.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-colors",
              dragActive ? "border-primary bg-primary/5" : "border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low",
            )}
          >
            <MaterialIcon name="add_a_photo" className="mb-2 text-4xl text-text-muted" />
            <p className="text-label-lg text-text-main">Kliknite ili prevucite slike ovdje</p>
            <p className="mt-1 text-label-sm text-text-muted">PNG, JPG ili JPEG (Max. 10MB)</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={(event) => addFiles(event.target.files)}
            />
          </div>
          {photos.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {photos.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-1.5 text-label-sm text-text-main"
                >
                  {file.name}
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    aria-label={`Ukloni ${file.name}`}
                    className="text-text-muted hover:text-error"
                  >
                    <MaterialIcon name="close" className="text-[16px]" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
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

        <div className="rounded-xl bg-surface-white/80 p-8 shadow-sm backdrop-blur-md md:col-span-2">
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
      </div>

      <div className="flex flex-col items-center justify-between gap-6 pt-8 md:flex-row">
        <div className="flex items-center gap-3 text-text-muted">
          <MaterialIcon name="verified_user" filled className="text-secondary" />
          <span className="text-label-sm">Vaši podaci su sigurni i zaštićeni.</span>
        </div>
        <Button type="submit" size="lg" fullWidth className="md:w-auto" disabled={state === "submitting"}>
          {state === "submitting" ? (
            <>
              <MaterialIcon name="progress_activity" className="animate-spin" />
              Slanje...
            </>
          ) : (
            <>
              Pošalji zahtjev
              <MaterialIcon name="send" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
