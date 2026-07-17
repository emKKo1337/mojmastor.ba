import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/supabase";

/**
 * Refreshes the Supabase session cookie on every request and returns the
 * (possibly updated) response, the current user (if any), and the client
 * itself so callers can run one extra query without re-authenticating.
 * Used by `src/proxy.ts` to keep sessions alive and gate protected routes.
 *
 * Any failure (most commonly: Supabase env vars not configured yet) is
 * treated as "signed out" rather than crashing every request — the proxy
 * runs on nearly every route, so it must never throw.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  try {
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          },
        },
      },
    );

    // IMPORTANT: do not run any code between createServerClient and getUser().
    // A simple mistake here can make it very hard to debug session issues.
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return { response, user, supabase };
  } catch {
    return { response, user: null, supabase: null as SupabaseClient<Database> | null };
  }
}
