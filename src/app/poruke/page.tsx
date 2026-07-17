import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MessengerView } from "@/components/sections/MessengerView";
import { customerSidebarLinks, craftsmanSidebarLinks } from "@/data/navigation";
import { conversations } from "@/data/conversations";
import { getAuthenticatedUser } from "@/lib/auth/session";
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

  const { majstor } = await searchParams;
  const initialConversationId = conversations.find((c) => c.participant.id === majstor)?.id;

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
        <MessengerView conversations={conversations} initialConversationId={initialConversationId} />
      </div>
    </div>
  );
}
