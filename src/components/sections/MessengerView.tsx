"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";
import type { ChatMessage, Conversation } from "@/types";

const CURRENT_USER_ID = "me";

export function MessengerView({
  conversations,
  initialConversationId,
}: {
  conversations: Conversation[];
  initialConversationId?: string;
}) {
  const [allMessages, setAllMessages] = useState<Record<string, ChatMessage[]>>(() =>
    Object.fromEntries(conversations.map((c) => [c.id, c.messages])),
  );
  const [activeId, setActiveId] = useState<string | undefined>(
    initialConversationId && conversations.some((c) => c.id === initialConversationId)
      ? initialConversationId
      : conversations[0]?.id,
  );
  const [showConversationOnMobile, setShowConversationOnMobile] = useState(false);
  const [draft, setDraft] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const active = useMemo(() => conversations.find((c) => c.id === activeId), [conversations, activeId]);
  const activeMessages = activeId ? allMessages[activeId] ?? [] : [];

  function selectConversation(id: string) {
    setActiveId(id);
    setShowConversationOnMobile(true);
  }

  function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim() || !activeId) return;
    const message: ChatMessage = {
      id: `local-${Date.now()}`,
      conversationId: activeId,
      senderId: CURRENT_USER_ID,
      body: draft.trim(),
      sentAt: new Date().toLocaleTimeString("bs-BA", { hour: "2-digit", minute: "2-digit" }),
    };
    setAllMessages((prev) => ({ ...prev, [activeId]: [...(prev[activeId] ?? []), message] }));
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
          {conversations.map((conversation) => {
            const isActive = conversation.id === activeId;
            const lastMessage = allMessages[conversation.id]?.at(-1);
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
                  <span
                    className={cn(
                      "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white",
                      conversation.participant.online ? "bg-secondary" : "bg-text-muted",
                    )}
                  />
                </div>
                <div className="min-w-0 flex-grow">
                  <div className="flex items-baseline justify-between">
                    <h3 className="truncate text-label-lg text-text-main">{conversation.participant.name}</h3>
                    <span className={cn("text-[10px]", isActive ? "font-bold text-primary" : "text-text-muted")}>
                      {conversation.lastMessageAt}
                    </span>
                  </div>
                  <p className="truncate text-sm text-text-muted">{lastMessage?.body ?? conversation.lastMessage}</p>
                </div>
              </button>
            );
          })}
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
                <div className="relative">
                  <Image
                    src={active.participant.avatarUrl}
                    alt={active.participant.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <span
                    className={cn(
                      "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white",
                      active.participant.online ? "bg-secondary" : "bg-text-muted",
                    )}
                  />
                </div>
                <div>
                  <h2 className="text-body-md font-bold text-text-main">{active.participant.name}</h2>
                  <p className={cn("text-xs font-medium", active.participant.online ? "text-secondary" : "text-text-muted")}>
                    {active.participant.online ? "Aktivan sada" : "Nije aktivan"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" className="rounded-full p-2 text-text-muted transition-colors hover:bg-surface-container" aria-label="Poziv">
                  <MaterialIcon name="call" />
                </button>
                <button type="button" className="rounded-full p-2 text-text-muted transition-colors hover:bg-surface-container" aria-label="Video poziv">
                  <MaterialIcon name="videocam" />
                </button>
              </div>
            </header>

            <div className="custom-scrollbar flex flex-grow flex-col gap-6 overflow-y-auto p-4 md:p-8">
              <div className="flex items-center justify-center">
                <span className="rounded-full bg-surface-container-highest/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Danas
                </span>
              </div>
              {activeMessages.map((message) => {
                const isMine = message.senderId === CURRENT_USER_ID;
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
              })}
            </div>

            <footer className="border-t border-border-light bg-surface-white p-4 md:p-6">
              <form onSubmit={handleSend} className="mx-auto flex max-w-4xl items-end gap-3 md:gap-4">
                <div className="mb-2 hidden gap-2 sm:flex">
                  <button type="button" className="rounded-full p-2 text-text-muted transition-colors hover:bg-surface-container" aria-label="Dodaj privitak">
                    <MaterialIcon name="add_circle" />
                  </button>
                  <button type="button" className="rounded-full p-2 text-text-muted transition-colors hover:bg-surface-container" aria-label="Dodaj sliku">
                    <MaterialIcon name="image" />
                  </button>
                </div>
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
                  disabled={!draft.trim()}
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
