import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { getPasswordRequirements } from "@/lib/validation";
import { cn } from "@/lib/utils";

/** Live checklist of password-strength requirements, shown while the user types. */
export function PasswordRequirementsList({ password }: { password: string }) {
  const requirements = getPasswordRequirements(password);

  return (
    <ul className="mt-2 space-y-1">
      {requirements.map((requirement) => (
        <li
          key={requirement.label}
          className={cn(
            "flex items-center gap-1.5 text-label-sm",
            requirement.met ? "text-secondary" : "text-text-muted",
          )}
        >
          <MaterialIcon
            name={requirement.met ? "check_circle" : "radio_button_unchecked"}
            filled={requirement.met}
            className="text-[14px]"
          />
          {requirement.label}
        </li>
      ))}
    </ul>
  );
}
