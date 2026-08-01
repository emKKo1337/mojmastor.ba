/**
 * UI-visibility gate only — controls whether the app shows/routes to the
 * admin pages. The actual authorization is enforced in the database by
 * `set_craftsman_verified`, which checks the `admin_emails` table
 * regardless of what the app server sends.
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const allowlist = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
  return allowlist.includes(email.toLowerCase());
}
