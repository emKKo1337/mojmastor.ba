import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MessengerView } from "@/components/sections/MessengerView";
import { customerSidebarLinks, craftsmanSidebarLinks } from "@/data/navigation";
import { getConversationsForUser } from "@/lib/messaging/data";
import { getAuthenticatedUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Poruke",
  robots: { index: false, follow: false },
};

interface PorukePageProps {
  searchParams: Promise<{ majstor?: string }>;
}

export default async function PorukePage({ searchParams }: PorukePageProps) {
  const authenticatedUser = await getAuthenticatedUser();
  if (!authenticatedUser) redirect("/prijava?redirect=/poruke");
  const { profile, craftsmanProfile } = authenticatedUser;

  let conversations = await getConversationsForUser(profile.id);

  const { majstor } = await searchParams;
  let initialConversationId = conversations.find((c) => c.participant.id === majstor)?.id;

  // Starting a chat directly from a real majstor's public profile, before
  // any job request exists between them yet.
  if (majstor && !initialConversationId && profile.role === "korisnik") {
    const supabase = await createClient();
    const { data: targetIsMajstor } = await supabase
      .from("craftsman_profiles")
      .select("profile_id")
      .eq("profile_id", majstor)
      .maybeSingle();

    if (targetIsMajstor) {
      const { data: created } = await supabase
        .from("conversations")
        .insert({ customer_id: profile.id, craftsman_id: majstor })
        .select("id")
        .maybeSingle();

      if (created) {
        conversations = await getConversationsForUser(profile.id);
        initialConversationId = created.id;
      }
    }
  }

  const isMajstor = profile.role === "majstor";

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar
        width={isMajstor ? "w-72" : "w-64"}
        links={isMajstor ? craftsmanSidebarLinks : customerSidebarLinks}
        user={{
          name: `${profile.firstName} ${profile.lastName}`.trim(),
          roleLabel: isMajstor ? craftsmanProfile?.headline || "Majstor" : "Korisnik",
          avatarUrl: profile.avatarUrl || "/images/avatars/korisnik-haris.jpg",
        }}
      />
      <div className={cn("h-full flex-grow", isMajstor ? "md:ml-72" : "md:ml-64")}>
        <MessengerView
          conversations={conversations}
          currentUserId={profile.id}
          initialConversationId={initialConversationId}
        />
      </div>
    </div>
  );
}
