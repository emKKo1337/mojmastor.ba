import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/** Routes that require any signed-in, email-verified account. */
const PROTECTED_PREFIXES = ["/nadzorna-ploca", "/panel-majstora", "/poruke"];

/** Routes only reachable by the "korisnik" role. */
const KORISNIK_ONLY_PREFIXES = ["/nadzorna-ploca"];

/** Routes only reachable by the "majstor" role. */
const MAJSTOR_ONLY_PREFIXES = ["/panel-majstora"];

/** Auth pages that don't make sense to show to an already signed-in user. */
const GUEST_ONLY_PATHS = ["/prijava", "/registracija"];

function matchesPrefix(pathname: string, prefixes: string[]) {
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export async function proxy(request: NextRequest) {
  const { response, user, supabase } = await updateSession(request);
  const { pathname } = request.nextUrl;

  const isProtected = matchesPrefix(pathname, PROTECTED_PREFIXES);
  const isGuestOnly = GUEST_ONLY_PATHS.includes(pathname);

  if (!user) {
    if (isProtected) {
      const redirectUrl = new URL("/prijava", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
    return response;
  }

  // Signed in: keep them off the login/registration pages.
  if (isGuestOnly) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isProtected) {
    return response;
  }

  if (!user.email_confirmed_at) {
    return NextResponse.redirect(new URL("/provjeri-email", request.url));
  }

  const needsRoleCheck = matchesPrefix(pathname, KORISNIK_ONLY_PREFIXES) || matchesPrefix(pathname, MAJSTOR_ONLY_PREFIXES);

  if (needsRoleCheck && supabase) {
    // The role in the JWT's user_metadata is client-settable and not
    // trustworthy for authorization — read the real column instead.
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();

    if (profile) {
      if (matchesPrefix(pathname, KORISNIK_ONLY_PREFIXES) && profile.role !== "korisnik") {
        return NextResponse.redirect(new URL("/panel-majstora", request.url));
      }
      if (matchesPrefix(pathname, MAJSTOR_ONLY_PREFIXES) && profile.role !== "majstor") {
        return NextResponse.redirect(new URL("/nadzorna-ploca", request.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};
