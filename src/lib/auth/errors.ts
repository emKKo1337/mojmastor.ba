/** Translates common Supabase Auth error messages into Bosnian for display in forms. */
export function translateAuthError(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "Pogrešan email ili lozinka.";
  }
  if (normalized.includes("already registered") || normalized.includes("already exists")) {
    return "Korisnik sa ovom email adresom već postoji.";
  }
  if (normalized.includes("email not confirmed")) {
    return "Molimo potvrdite svoju email adresu prije prijave.";
  }
  if (normalized.includes("password should be at least")) {
    return "Lozinka je prekratka.";
  }
  if (normalized.includes("rate limit") || normalized.includes("too many requests")) {
    return "Previše pokušaja. Pokušajte ponovo za nekoliko minuta.";
  }
  if (normalized.includes("token has expired") || (normalized.includes("invalid") && normalized.includes("token"))) {
    return "Link je istekao ili je nevažeći. Zatražite novi.";
  }
  if (normalized.includes("network")) {
    return "Greška u vezi. Provjerite internet konekciju i pokušajte ponovo.";
  }
  if (normalized.includes("same password")) {
    return "Nova lozinka mora biti drugačija od trenutne.";
  }

  return "Došlo je do greške. Pokušajte ponovo.";
}
