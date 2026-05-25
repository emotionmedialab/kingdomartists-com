"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Search } from "lucide-react";
import { VerifiedBadge } from "@/components/app/verified-badge";
import { MOCK_ARTISTS, MOCK_CONVERSATIONS, CURRENT_USER } from "@/lib/mock-data";
import type { Conversation } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function timeAgo(dateStr: string) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "now";
  if (diffMin < 60) return `${diffMin}m`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d`;
}

function ConversationList({
  conversations,
  activeId,
  onSelect,
}: {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="p-4 pb-2">
        <h1 className="font-[family-name:var(--font-heading)] text-xl font-medium">
          Messages
        </h1>
      </div>
      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full bg-muted/50 border border-border/40 rounded-xl pl-9 pr-4 py-2.5 text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/20 transition-colors"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => {
          const other = MOCK_ARTISTS.find((a) => a.username === conv.with);
          if (!other) return null;
          return (
            <button
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/50 transition-colors text-left",
                activeId === conv.id && "bg-muted/60"
              )}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={other.image}
                  alt={other.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {conv.unread && (
                  <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-foreground border-2 border-background" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "text-sm truncate",
                      conv.unread ? "font-semibold" : "font-medium"
                    )}
                  >
                    {other.name}
                    {other.verified && (
                      <VerifiedBadge className="w-3.5 h-3.5 ml-1 inline" />
                    )}
                  </span>
                  <span className="text-[11px] text-muted-foreground/50 flex-shrink-0 ml-2">
                    {timeAgo(conv.lastMessageAt)}
                  </span>
                </div>
                <p
                  className={cn(
                    "text-xs truncate mt-0.5",
                    conv.unread
                      ? "text-foreground/70"
                      : "text-muted-foreground/60"
                  )}
                >
                  {conv.lastMessage}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChatView({
  conversation,
  onBack,
}: {
  conversation: Conversation;
  onBack: () => void;
}) {
  const [newMessage, setNewMessage] = useState("");
  const other = MOCK_ARTISTS.find((a) => a.username === conversation.with);

  if (!other) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30">
        <button
          onClick={onBack}
          className="md:hidden p-1 -ml-1 text-muted-foreground"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <img
          src={other.image}
          alt={other.name}
          className="w-9 h-9 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium flex items-center gap-1">
            {other.name}
            {other.verified && <VerifiedBadge className="w-3.5 h-3.5" />}
          </div>
          <div className="text-[11px] text-muted-foreground/50">
            {other.role}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {conversation.messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease }}
            className={cn(
              "flex",
              msg.from === "me" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] sm:max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                msg.from === "me"
                  ? "bg-foreground text-background rounded-br-md"
                  : "bg-muted/70 text-foreground rounded-bl-md"
              )}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border/30">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-muted/40 border border-border/40 rounded-xl px-4 py-2.5 text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/20 transition-colors"
          />
          <button
            className={cn(
              "p-2.5 rounded-xl transition-all",
              newMessage
                ? "bg-foreground text-background"
                : "bg-muted/50 text-muted-foreground/30"
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  const [activeConv, setActiveConv] = useState<string | null>(null);
  const active = MOCK_CONVERSATIONS.find((c) => c.id === activeConv);

  return (
    <div className="max-w-5xl mx-auto h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-4rem)] md:py-6 md:px-6">
      <div className="h-full md:border md:border-border/40 md:rounded-2xl overflow-hidden flex bg-background">
        {/* Conversation list */}
        <div
          className={cn(
            "w-full md:w-80 lg:w-96 md:border-r md:border-border/30 flex-shrink-0",
            activeConv ? "hidden md:flex md:flex-col" : "flex flex-col"
          )}
        >
          <ConversationList
            conversations={MOCK_CONVERSATIONS}
            activeId={activeConv}
            onSelect={setActiveConv}
          />
        </div>

        {/* Chat area */}
        <div
          className={cn(
            "flex-1",
            !activeConv ? "hidden md:flex" : "flex"
          )}
        >
          {active ? (
            <div className="w-full flex flex-col">
              <ChatView
                conversation={active}
                onBack={() => setActiveConv(null)}
              />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-6 h-6 text-muted-foreground/30" />
                </div>
                <p className="text-muted-foreground text-sm">
                  Select a conversation to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
