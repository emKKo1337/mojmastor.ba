/**
 * Hand-authored counterpart of `supabase/migrations/20260717120000_init_schema.sql`,
 * shaped to match what `supabase gen types typescript` would produce so the
 * Supabase client's generics resolve correctly.
 *
 * Once a real Supabase project exists, regenerate this with
 * `supabase gen types typescript --project-id <id> > src/types/supabase.ts`
 * and it will slot in unchanged (same shape, same import site).
 */

export type AccountRoleRow = "korisnik" | "majstor";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: AccountRoleRow;
          first_name: string;
          last_name: string;
          phone: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: AccountRoleRow;
          first_name: string;
          last_name: string;
          phone: string;
          avatar_url?: string | null;
        };
        Update: Partial<{
          first_name: string;
          last_name: string;
          phone: string;
          avatar_url: string | null;
        }>;
        Relationships: [];
      };
      craftsman_profiles: {
        Row: {
          profile_id: string;
          headline: string;
          bio: string;
          hourly_rate_from: number | null;
          years_experience: number;
          working_cities: string[];
          category_slugs: string[];
          verified: boolean;
          updated_at: string;
        };
        Insert: {
          profile_id: string;
          headline?: string;
          bio?: string;
          hourly_rate_from?: number | null;
          years_experience?: number;
          working_cities?: string[];
          category_slugs?: string[];
        };
        Update: Partial<{
          headline: string;
          bio: string;
          hourly_rate_from: number | null;
          years_experience: number;
          working_cities: string[];
          category_slugs: string[];
        }>;
        Relationships: [];
      };
      craftsman_gallery: {
        Row: {
          id: string;
          profile_id: string;
          storage_path: string;
          caption: string;
          position: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          storage_path: string;
          caption?: string;
          position?: number;
        };
        Update: Partial<{
          caption: string;
          position: number;
        }>;
        Relationships: [];
      };
      favourites: {
        Row: {
          user_id: string;
          craftsman_ref: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          craftsman_ref: string;
        };
        Update: {
          user_id?: string;
          craftsman_ref?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      account_role: AccountRoleRow;
    };
    CompositeTypes: Record<string, never>;
  };
}
