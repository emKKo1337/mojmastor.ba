/**
 * Small, dependency-free form validators shared by the registration and
 * password forms. Each returns a Bosnian error message, or null when the
 * value is valid.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+0-9][0-9 ()-]{7,}$/;

export function validateRequired(value: string, fieldLabel: string): string | null {
  return value.trim() ? null : `Polje "${fieldLabel}" je obavezno.`;
}

export function validateEmail(value: string): string | null {
  if (!value.trim()) return 'Polje "Email" je obavezno.';
  return EMAIL_PATTERN.test(value.trim()) ? null : "Unesite ispravnu email adresu.";
}

export function validatePhone(value: string): string | null {
  if (!value.trim()) return 'Polje "Telefon" je obavezno.';
  return PHONE_PATTERN.test(value.trim()) ? null : "Unesite ispravan broj telefona (npr. +387 61 234 567).";
}

export interface PasswordRequirement {
  label: string;
  met: boolean;
}

export function getPasswordRequirements(password: string): PasswordRequirement[] {
  return [
    { label: "Najmanje 8 karaktera", met: password.length >= 8 },
    { label: "Jedno veliko slovo", met: /[A-ZČĆŠĐŽ]/.test(password) },
    { label: "Jedno malo slovo", met: /[a-zčćšđž]/.test(password) },
    { label: "Jedan broj", met: /[0-9]/.test(password) },
  ];
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Polje "Lozinka" je obavezno.';
  const unmet = getPasswordRequirements(password).filter((requirement) => !requirement.met);
  if (unmet.length > 0) {
    return `Lozinka mora sadržavati: ${unmet.map((requirement) => requirement.label.toLowerCase()).join(", ")}.`;
  }
  return null;
}

export function validatePasswordConfirmation(password: string, confirmation: string): string | null {
  if (!confirmation) return "Potvrdite lozinku.";
  return password === confirmation ? null : "Lozinke se ne podudaraju.";
}
