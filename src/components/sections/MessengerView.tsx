"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { ChatMessage, Conversation } from "@/types";

export function MessengerView({
  conversations,
  currentUserId,
  initialConversationId,
}: {
  conversations: Conversation[];
  currentUserId: string;
  initialConversationId?: string;
}) {
  const [activeId, setActiveId] = useState<string | undefined>(
    initialConversationId && conversations.some((c) => c.id === initialConversationId)
      ? initialConversationId
      : conversations[0]?.id,
  );
  // Keyed by conversation id, so loading/empty state is derived by comparing
  // to `activeId` rather than tracked as separate state to keep in sync.
  const [loadedMessages, setLoadedMessages] = useState<{ conversationId: string; messages: ChatMessage[] } | null>(null);
  const [showConversationOnMobile, setShowConversationOnMobile] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const active = useMemo(() => conversations.find((c) => c.id === activeId), [conversations, activeId]);
  const loadingMessages = Boolean(activeId) && loadedMessages?.conversationId !== activeId;
  const messages = loadedMessages && loadedMessages.conversationId === activeId ? loadedMessages.messages : [];

  useEffect(() => {
    if (!activeId) return;
    let cancelled = false;
    const supabase = createClient();
    supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", activeId)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (cancelled) return;
        setLoadedMessages({
          conversationId: activeId,
          messages: (data ?? []).map((row) => ({
            id: row.id,
            conversationId: row.conversation_id,
            senderId: row.sender_id,
            body: row.body,
            sentAt: new Date(row.created_at).toLocaleTimeString("bs-BA", { hour: "2-digit", minute: "2-digit" }),
          })),
        });
      });
    return () => {
      cancelled = true;
    };
  }, [activeId]);

  function selectConversation(id: string) {
    setActiveId(id);
    setShowConversationOnMobile(true);
  }

  async function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = draft.trim();
    if (!body || !activeId || sending) return;

    setSending(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("messages")
      .insert({ conversation_id: activeId, sender_id: currentUserId, body })
      .select()
      .single();
    setSending(false);

    if (error || !data) return;

    const sentMessage: ChatMessage = {
      id: data.id,
      conversationId: data.conversation_id,
      senderId: data.sender_id,
      body: data.body,
      sentAt: new Date(data.created_at).toLocaleTimeString("bs-BA", { hour: "2-digit", minute: "2-digit" }),
    };
    setLoadedMessages((prev) => ({
      conversationId: activeId,
      messages: prev?.conversationId === activeId ? [...prev.messages, sentMessage] : [sentMessage],
    }));
    setDraft("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  return (
    <div className="flex h-full flex-col overflow-hidden md:flex-row">
      <section
        className={cn(
          "flex h-full w-full flex-col border-r border-border-light bg-surface-white md:flex md:w-80 lg:w-96",
          showConversationOnMobile && "hidden md:flex",
        )}
      >
        <div className="border-b border-border-light p-6">
          <h1 className="mb-4 text-headline-md font-bold">Moje poruke</h1>
          <div className="relative">
            <MaterialIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Pretraži poruke..."
              className="w-full rounded-xl border-none bg-surface-container-low py-3 pl-10 pr-4 text-body-md focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        <div className="custom-scrollbar flex-grow overflow-y-auto">
          {conversations.length > 0 ? (
            conversations.map((conversation) => {
              const isActive = conversation.id === activeId;
              return (
                <button
                  key={conversation.id}
                  onClick={() => selectConversation(conversation.id)}
                  className={cn(
                    "flex w-full items-center gap-4 border-l-4 p-4 text-left transition-colors",
                    isActive ? "border-primary bg-primary-container/5" : "border-transparent hover:bg-surface-container-low",
                  )}
                >
                  <div className="relative flex-shrink-0">
                    <Image
                      src={conversation.participant.avatarUrl}
                      alt={conversation.participant.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <div className="flex items-baseline justify-between">
                      <h3 className="truncate text-label-lg text-text-main">{conversation.participant.name}</h3>
                      <span className={cn("text-[10px]", isActive ? "font-bold text-primary" : "text-text-muted")}>
                        {conversation.lastMessageAt}
                      </span>
                    </div>
                    <p className="truncate text-sm text-text-muted">{conversation.lastMessage}</p>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <MaterialIcon name="forum" className="mb-3 text-4xl text-text-muted" />
              <p className="text-body-md text-text-muted">
                Nemate razgovora još uvijek. Razgovor se otvara automatski kada majstor prihvati vaš zahtjev.
              </p>
            </div>
          )}
        </div>
      </section>

      <section
        className={cn(
          "relative flex flex-grow flex-col bg-surface-bright",
          !showConversationOnMobile && "hidden md:flex",
        )}
      >
        {active ? (
          <>
            <header className="z-10 flex h-20 items-center justify-between border-b border-border-light bg-surface-white px-4 shadow-sm md:px-8">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowConversationOnMobile(false)}
                  className="text-text-muted md:hidden"
                  aria-label="Nazad na razgovore"
                >
                  <MaterialIcon name="arrow_back" />
                </button>
                <Image
                  src={active.participant.avatarUrl}
                  alt={active.participant.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-body-md font-bold text-text-main">{active.participant.name}</h2>
                </div>
              </div>
            </header>

            <div className="custom-scrollbar flex flex-grow flex-col gap-6 overflow-y-auto p-4 md:p-8">
              {loadingMessages ? (
                <p className="text-center text-body-md text-text-muted">Učitavanje poruka...</p>
              ) : messages.length > 0 ? (
                messages.map((message) => {
                  const isMine = message.senderId === currentUserId;
                  return (
                    <div
                      key={message.id}
                      className={cn("flex max-w-[85%] gap-3 md:max-w-[80%]", isMine && "flex-row-reverse self-end")}
                    >
                      {!isMine ? (
                        <Image
                          src={active.participant.avatarUrl}
                          alt={active.participant.name}
                          width={32}
                          height={32}
                          className="h-8 w-8 flex-shrink-0 self-end rounded-full object-cover"
                        />
                      ) : null}
                      <div
                        className={cn(
                          "rounded-2xl p-4",
                          isMine
                            ? "rounded-br-none bg-primary text-on-primary shadow-md"
                            : "rounded-bl-none border border-border-light bg-surface-white shadow-sm",
                        )}
                      >
                        <p className="text-body-md">{message.body}</p>
                        <span className={cn("mt-2 block text-[10px]", isMine ? "text-right text-on-primary/70" : "text-text-muted")}>
                          {message.sentAt}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-body-md text-text-muted">Pošaljite prvu poruku u ovom razgovoru.</p>
              )}
            </div>

            <footer className="border-t border-border-light bg-surface-white p-4 md:p-6">
              <form onSubmit={handleSend} className="mx-auto flex max-w-4xl items-end gap-3 md:gap-4">
                <div className="relative flex-grow">
                  <textarea
                    ref={textareaRef}
                    value={draft}
                    onChange={(event) => {
                      setDraft(event.target.value);
                      const el = event.target;
                      el.style.height = "auto";
                      el.style.height = `${el.scrollHeight}px`;
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        event.currentTarget.form?.requestSubmit();
                      }
                    }}
                    placeholder="Napišite poruku..."
                    rows={1}
                    className="max-h-32 w-full resize-none rounded-2xl border-none bg-surface-container-low p-4 pr-12 text-body-md focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!draft.trim() || sending}
                  className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-4 font-bold text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-95 disabled:opacity-50"
                >
                  <span className="hidden sm:inline">Pošalji</span>
                  <MaterialIcon name="send" className="text-[20px]" />
                </button>
              </form>
            </footer>
          </>
        ) : (
          <div className="flex flex-grow flex-col items-center justify-center bg-surface-bright p-8 text-center">
            <MaterialIcon name="chat_bubble" className="mb-4 text-6xl text-primary/20" />
            <h2 className="mb-2 text-headline-md text-text-main">Odaberite razgovor</h2>
            <p className="text-body-md text-text-muted">
              Kliknite na jednu od osoba s lijeve strane kako biste započeli dopisivanje.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
