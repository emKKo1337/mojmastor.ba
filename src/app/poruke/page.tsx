import type { Metadata } from "next";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MessengerView } from "@/components/sections/MessengerView";
import { customerSidebarLinks } from "@/data/navigation";
import { conversations } from "@/data/conversations";

export const metadata: Metadata = {
  title: "Poruke",
  robots: { index: false, follow: false },
};

interface PorukePageProps {
  searchParams: Promise<{ majstor?: string }>;
}

export default async function PorukePage({ searchParams }: PorukePageProps) {
  const { majstor } = await searchParams;
  const initialConversationId = conversations.find((c) => c.participant.id === majstor)?.id;

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar
        links={customerSidebarLinks}
        user={{ name: "Haris K.", roleLabel: "Klijent", avatarUrl: "/images/avatars/korisnik-haris.jpg" }}
      />
      <div className="h-full flex-grow md:ml-64">
        <MessengerView conversations={conversations} initialConversationId={initialConversationId} />
      </div>
    </div>
  );
}
