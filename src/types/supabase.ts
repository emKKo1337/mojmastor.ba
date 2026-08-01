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
export type JobRequestStatusRow = "pending" | "accepted" | "completed" | "cancelled";

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
      job_requests: {
        Row: {
          id: string;
          customer_id: string;
          craftsman_id: string | null;
          title: string;
          description: string;
          category_slug: string;
          city: string;
          neighborhood: string;
          budget_from: number | null;
          budget_to: number | null;
          preferred_date: string;
          urgent: boolean;
          status: JobRequestStatusRow;
          declined_by: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          craftsman_id?: string | null;
          title: string;
          description: string;
          category_slug: string;
          city: string;
          neighborhood?: string;
          budget_from?: number | null;
          budget_to?: number | null;
          preferred_date?: string;
          urgent?: boolean;
          status?: JobRequestStatusRow;
          declined_by?: string[];
        };
        Update: Partial<{
          craftsman_id: string | null;
          status: JobRequestStatusRow;
          declined_by: string[];
        }>;
        Relationships: [];
      };
      conversations: {
        Row: {
          id: string;
          customer_id: string;
          craftsman_id: string;
          last_message_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          craftsman_id: string;
        };
        Update: Record<string, never>;
        Relationships: [];
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          body: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          sender_id: string;
          body: string;
        };
        Update: Record<string, never>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      account_role: AccountRoleRow;
      job_request_status: JobRequestStatusRow;
    };
    CompositeTypes: Record<string, never>;
  };
}
