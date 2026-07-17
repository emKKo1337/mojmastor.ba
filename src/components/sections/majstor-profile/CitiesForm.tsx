"use client";

import { useActionState } from "react";
import { updateWorkingCitiesAction } from "@/lib/majstor/actions";
import { idleState } from "@/lib/action-state";
import { cities } from "@/data/cities";
import { ChipMultiSelect } from "@/components/sections/ChipMultiSelect";
import { SubmitButton } from "@/components/sections/account/SubmitButton";
import { ActionStatusMessage } from "@/components/sections/account/ActionStatusMessage";

const cityOptions = cities.map((city) => ({ value: city, label: city }));

export function CitiesForm({ defaultCities }: { defaultCities: string[] }) {
  const [state, formAction] = useActionState(updateWorkingCitiesAction, idleState);

  return (
    <form action={formAction} className="space-y-6">
      <ActionStatusMessage state={state} />
      <ChipMultiSelect
        name="workingCities"
        options={cityOptions}
        defaultSelected={defaultCities}
        searchPlaceholder="Pretraži gradove..."
        emptyMessage="Nema gradova koji odgovaraju pretrazi."
      />
      <SubmitButton pendingLabel="Spremanje...">Sačuvaj gradove</SubmitButton>
    </form>
  );
}
