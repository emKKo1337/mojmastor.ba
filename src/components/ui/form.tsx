import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export function Label({ children, htmlFor, className }: { children: React.ReactNode; htmlFor?: string; className?: string }) {
  return (
    <label htmlFor={htmlFor} className={cn("block text-label-lg text-text-main mb-2", className)}>
      {children}
    </label>
  );
}

/** Inline validation message for a form field. Renders nothing when there's no error. */
export function FieldError({ children }: { children?: string | null }) {
  if (!children) return null;
  return (
    <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-label-sm text-error">
      <MaterialIcon name="error" className="text-[14px]" />
      {children}
    </p>
  );
}

const fieldBase =
  "w-full rounded-lg border bg-surface-white text-body-md text-text-main placeholder:text-text-muted/70 outline-none transition-all focus:ring-2";

function fieldStateClasses(invalid?: boolean) {
  return invalid
    ? "border-error focus:border-error focus:ring-error/20"
    : "border-border-light focus:border-primary focus:ring-primary/20";
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  invalid?: boolean;
}

export function TextField({ icon, invalid, className, ...props }: TextFieldProps) {
  if (icon) {
    return (
      <div className="relative flex items-center">
        <MaterialIcon name={icon} className="absolute left-4 text-text-muted" />
        <input
          aria-invalid={invalid || undefined}
          className={cn(fieldBase, fieldStateClasses(invalid), "h-14 pl-12 pr-4", className)}
          {...props}
        />
      </div>
    );
  }
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(fieldBase, fieldStateClasses(invalid), "h-14 px-4", className)}
      {...props}
    />
  );
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export function TextArea({ invalid, className, ...props }: TextAreaProps) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={cn(fieldBase, fieldStateClasses(invalid), "px-4 py-3", className)}
      {...props}
    />
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

export function Select({ invalid, className, children, ...props }: SelectProps) {
  return (
    <select
      aria-invalid={invalid || undefined}
      className={cn(
        fieldBase,
        fieldStateClasses(invalid),
        "h-14 px-4 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-[right_16px_center] bg-no-repeat pr-10",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
