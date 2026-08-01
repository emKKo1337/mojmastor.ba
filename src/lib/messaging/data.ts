import { createClient } from "@/lib/supabase/server";
import { formatRelativeTime } from "@/lib/utils";
import type { Conversation } from "@/types";

/** Server-side conversation list for the /poruke page — one thread per customer/majstor pair. */
export async function getConversationsForUser(userId: string): Promise<Conversation[]> {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("conversations")
    .select("*")
    .or(`customer_id.eq.${userId},craftsman_id.eq.${userId}`)
    .order("last_message_at", { ascending: false });

  if (!rows || rows.length === 0) return [];

  const otherIds = rows.map((row) => (row.customer_id === userId ? row.craftsman_id : row.customer_id));
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, avatar_url")
    .in("id", otherIds);
  const profileById = new Map((profiles ?? []).map((profile) => [profile.id, profile]));

  const conversationIds = rows.map((row) => row.id);
  const { data: messages } = await supabase
    .from("messages")
    .select("conversation_id, body, created_at")
    .in("conversation_id", conversationIds)
    .order("created_at", { ascending: false });

  const lastMessageByConversation = new Map<string, { body: string; created_at: string }>();
  (messages ?? []).forEach((message) => {
    if (!lastMessageByConversation.has(message.conversation_id)) {
      lastMessageByConversation.set(message.conversation_id, message);
    }
  });

  return rows.map((row) => {
    const otherId = row.customer_id === userId ? row.craftsman_id : row.customer_id;
    const otherProfile = profileById.get(otherId);
    const lastMessage = lastMessageByConversation.get(row.id);

    return {
      id: row.id,
      participant: {
        id: otherId,
        name: otherProfile ? `${otherProfile.first_name} ${otherProfile.last_name}`.trim() : "Nepoznat korisnik",
        avatarUrl: otherProfile?.avatar_url || "/images/avatars/haris-korisnik.jpg",
        online: false,
      },
      lastMessage: lastMessage?.body ?? "Razgovor je otvoren.",
      lastMessageAt: formatRelativeTime(lastMessage?.created_at ?? row.created_at),
      unread: false,
    };
  });
}
