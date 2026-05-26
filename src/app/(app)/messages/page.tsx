"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Send,
  Search,
  ImagePlus,
  Smile,
  MoreHorizontal,
  Phone,
  Video,
  Circle,
} from "lucide-react";
import { VerifiedBadge } from "@/components/app/verified-badge";
import {
  MOCK_ARTISTS,
  MOCK_CONVERSATIONS,
  CURRENT_USER,
} from "@/lib/mock-data";
import type { Conversation, Message } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const onlineUsers = ["elijahosei", "priyasharma", "marcelorios"];

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
  if (diffDay < 7) return `${diffDay}d`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatMessageTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getDateLabel(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === now.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

function shouldShowDateSeparator(
  messages: Message[],
  index: number
): boolean {
  if (index === 0) return true;
  const prev = new Date(messages[index - 1].sentAt).toDateString();
  const curr = new Date(messages[index].sentAt).toDateString();
  return prev !== curr;
}

function isConsecutive(messages: Message[], index: number): boolean {
  if (index === 0) return false;
  const prev = messages[index - 1];
  const curr = messages[index];
  if (prev.from !== curr.from) return false;
  const diffMin =
    (new Date(curr.sentAt).getTime() - new Date(prev.sentAt).getTime()) / 60000;
  return diffMin < 3;
}

function isLastInGroup(messages: Message[], index: number): boolean {
  if (index === messages.length - 1) return true;
  return !isConsecutive(messages, index + 1) || messages[index + 1].from !== messages[index].from;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-2.5 rounded-2xl rounded-bl-md bg-muted/70 w-fit">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
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
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = conversations.filter((conv) => {
    if (!searchQuery) return true;
    const other = MOCK_ARTISTS.find((a) => a.username === conv.with);
    return other?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <h1 className="font-[family-name:var(--font-heading)] text-xl font-medium">
            Messages
          </h1>
          <button className="p-2 -mr-2 rounded-xl hover:bg-muted/50 transition-colors">
            <MoreHorizontal className="w-5 h-5 text-muted-foreground/60" />
          </button>
        </div>
      </div>
      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted/40 border border-border/30 rounded-xl pl-9 pr-4 py-2 text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/20 focus:bg-muted/60 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-muted-foreground/50">
              No conversations found
            </p>
          </div>
        ) : (
          filtered.map((conv) => {
            const other = MOCK_ARTISTS.find((a) => a.username === conv.with);
            if (!other) return null;
            const isOnline = onlineUsers.includes(conv.with);
            return (
              <button
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors text-left",
                  activeId === conv.id && "bg-muted/50"
                )}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={other.image}
                    alt={other.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "text-sm truncate flex items-center gap-1",
                        conv.unread ? "font-semibold" : "font-medium"
                      )}
                    >
                      {other.name}
                      {other.verified && (
                        <VerifiedBadge className="w-3.5 h-3.5 inline flex-shrink-0" />
                      )}
                    </span>
                    <span
                      className={cn(
                        "text-[11px] flex-shrink-0",
                        conv.unread
                          ? "text-foreground font-medium"
                          : "text-muted-foreground/40"
                      )}
                    >
                      {timeAgo(conv.lastMessageAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p
                      className={cn(
                        "text-[13px] truncate flex-1",
                        conv.unread
                          ? "text-foreground/70 font-medium"
                          : "text-muted-foreground/50"
                      )}
                    >
                      {conv.lastMessage}
                    </p>
                    {conv.unread && (
                      <div className="w-2 h-2 rounded-full bg-foreground flex-shrink-0" />
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
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
  const [showTyping, setShowTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const other = MOCK_ARTISTS.find((a) => a.username === conversation.with);
  const isOnline = onlineUsers.includes(conversation.with);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.messages]);

  useEffect(() => {
    const timer = setTimeout(() => setShowTyping(true), 1500);
    const hideTimer = setTimeout(() => setShowTyping(false), 4000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [conversation.id]);

  if (!other) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30 bg-background/80 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="md:hidden p-1.5 -ml-1.5 rounded-lg hover:bg-muted/50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="relative">
          <img
            src={other.image}
            alt={other.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-background" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium flex items-center gap-1.5">
            {other.name}
            {other.verified && <VerifiedBadge className="w-3.5 h-3.5" />}
          </div>
          <div className="text-[11px] text-muted-foreground/50">
            {isOnline ? (
              <span className="text-emerald-600">Active now</span>
            ) : (
              other.role
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-xl hover:bg-muted/50 transition-colors">
            <Phone className="w-4 h-4 text-muted-foreground/60" />
          </button>
          <button className="p-2 rounded-xl hover:bg-muted/50 transition-colors">
            <Video className="w-4 h-4 text-muted-foreground/60" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {conversation.messages.map((msg, idx) => {
          const showDate = shouldShowDateSeparator(
            conversation.messages,
            idx
          );
          const consecutive = isConsecutive(conversation.messages, idx);
          const lastInGroup = isLastInGroup(conversation.messages, idx);
          const isMe = msg.from === "me";

          return (
            <div key={msg.id}>
              {showDate && (
                <div className="flex items-center justify-center my-5">
                  <span className="text-[11px] text-muted-foreground/40 bg-muted/40 px-3 py-1 rounded-full">
                    {getDateLabel(msg.sentAt)}
                  </span>
                </div>
              )}
              <div
                className={cn(
                  "flex",
                  isMe ? "justify-end" : "justify-start",
                  consecutive ? "mt-0.5" : "mt-3"
                )}
              >
                {!isMe && !consecutive && (
                  <img
                    src={other.image}
                    alt=""
                    className="w-7 h-7 rounded-full object-cover mr-2 mt-1 flex-shrink-0"
                  />
                )}
                {!isMe && consecutive && (
                  <div className="w-7 mr-2 flex-shrink-0" />
                )}
                <div className={cn("max-w-[75%] sm:max-w-[65%]")}>
                  <div
                    className={cn(
                      "px-3.5 py-2 text-[14px] leading-relaxed",
                      isMe
                        ? "bg-foreground text-background"
                        : "bg-muted/60 text-foreground",
                      !consecutive && isMe && "rounded-2xl rounded-br-md",
                      !consecutive && !isMe && "rounded-2xl rounded-bl-md",
                      consecutive && isMe && "rounded-2xl rounded-br-md",
                      consecutive && !isMe && "rounded-2xl rounded-bl-md"
                    )}
                  >
                    {msg.text}
                  </div>
                  {lastInGroup && (
                    <div
                      className={cn(
                        "text-[10px] text-muted-foreground/35 mt-1 px-1",
                        isMe ? "text-right" : "text-left"
                      )}
                    >
                      {formatMessageTime(msg.sentAt)}
                      {isMe && (
                        <span className="ml-1.5 text-muted-foreground/30">
                          Read
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {showTyping && (
          <div className="flex items-end gap-2 mt-3">
            <img
              src={other.image}
              alt=""
              className="w-7 h-7 rounded-full object-cover flex-shrink-0"
            />
            <TypingIndicator />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border/30 bg-background">
        <div className="flex items-end gap-2">
          <button className="p-2 rounded-xl hover:bg-muted/50 transition-colors flex-shrink-0 mb-0.5">
            <ImagePlus className="w-5 h-5 text-muted-foreground/40" />
          </button>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newMessage.trim()) {
                  setNewMessage("");
                }
              }}
              className="w-full bg-muted/40 border border-border/30 rounded-2xl pl-4 pr-10 py-2.5 text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/15 focus:bg-muted/50 transition-all"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <Smile className="w-4.5 h-4.5 text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors" />
            </button>
          </div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            className={cn(
              "p-2.5 rounded-xl transition-all flex-shrink-0 mb-0.5",
              newMessage.trim()
                ? "bg-foreground text-background shadow-sm"
                : "bg-muted/50 text-muted-foreground/25"
            )}
          >
            <Send className="w-4 h-4" />
          </motion.button>
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
      <div className="h-full md:border md:border-border/40 md:rounded-2xl overflow-hidden flex bg-background md:shadow-sm">
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
          className={cn("flex-1", !activeConv ? "hidden md:flex" : "flex")}
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
                <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-5">
                  <Send className="w-7 h-7 text-muted-foreground/20 -rotate-45" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-medium text-foreground/70">
                  Your messages
                </h3>
                <p className="text-muted-foreground/50 text-sm mt-1 max-w-[240px] mx-auto">
                  Select a conversation or discover new creatives to connect
                  with
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
