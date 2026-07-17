"use client";

import { useActionState } from "react";
import { updateServicesAction } from "@/lib/majstor/actions";
import { idleState } from "@/lib/action-state";
import { categories } from "@/data/categories";
import { ChipMultiSelect } from "@/components/sections/ChipMultiSelect";
import { SubmitButton } from "@/components/sections/account/SubmitButton";
import { ActionStatusMessage } from "@/components/sections/account/ActionStatusMessage";

const categoryOptions = categories.map((category) => ({ value: category.slug, label: category.name }));

export function ServicesForm({ defaultCategorySlugs }: { defaultCategorySlugs: string[] }) {
  const [state, formAction] = useActionState(updateServicesAction, idleState);

  return (
    <form action={formAction} className="space-y-6">
      <ActionStatusMessage state={state} />
      <ChipMultiSelect
        name="categorySlugs"
        options={categoryOptions}
        defaultSelected={defaultCategorySlugs}
        searchPlaceholder="Pretraži usluge..."
        emptyMessage="Nema usluga koje odgovaraju pretrazi."
      />
      <SubmitButton pendingLabel="Spremanje...">Sačuvaj usluge</SubmitButton>
    </form>
  );
}
