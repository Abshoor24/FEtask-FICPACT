"use client";

import { useState, useRef, useEffect } from "react";
import { useChat, fetchServerSentEvents } from "@tanstack/ai-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Loader2,
} from "lucide-react";

export function FloatingChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, isLoading } = useChat({
    connection: fetchServerSentEvents("/api/chat"),
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-shadow hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)",
            }}
            aria-label="Open AI Chat"
            id="floating-chat-button"
          >
            <MessageCircle className="h-6 w-6 text-white" />
            {/* Pulse ring */}
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-30"
              style={{
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden rounded-2xl shadow-2xl bg-white"
            style={{
              width: "min(400px, calc(100vw - 2rem))",
              height: "min(600px, calc(100vh - 6rem))",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
            id="floating-chat-modal"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{
                background:
                  "linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    TaskQuest AI
                  </h3>
                  <p className="text-xs text-white/70">Powered by Gemini</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
                aria-label="Close chat"
                id="close-chat-button"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))",
                      border: "1px solid rgba(99,102,241,0.2)",
                    }}
                  >
                    <Bot className="h-8 w-8 text-indigo-500" />
                  </div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-800">
                    Halo! Saya TaskQuest AI 👋
                  </h4>
                  <p className="max-w-[260px] text-xs leading-relaxed text-gray-500">
                    Tanya apa saja seputar task management, produktivitas, atau
                    butuh bantuan lainnya!
                  </p>
                  {/* Quick suggestions */}
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {[
                      "Tips produktivitas",
                      "Cara atur prioritas",
                      "Motivasi hari ini",
                    ].map((suggestion) => (
                      <motion.button
                        key={suggestion}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          sendMessage(suggestion);
                        }}
                        className="rounded-full px-3 py-1.5 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-100"
                        style={{
                          background: "rgba(99,102,241,0.08)",
                          border: "1px solid rgba(99,102,241,0.2)",
                        }}
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`mb-3 flex gap-2.5 ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      message.role === "assistant" ? "" : ""
                    }`}
                    style={
                      message.role === "assistant"
                        ? {
                            background:
                              "linear-gradient(135deg, #6366f1, #a855f7)",
                          }
                        : {
                            background:
                              "linear-gradient(135deg, #3b82f6, #06b6d4)",
                          }
                    }
                  >
                    {message.role === "assistant" ? (
                      <Bot className="h-3.5 w-3.5 text-white" />
                    ) : (
                      <User className="h-3.5 w-3.5 text-white" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      message.role === "user" ? "text-white" : "text-gray-800"
                    }`}
                    style={
                      message.role === "user"
                        ? {
                            background:
                              "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            borderBottomRightRadius: "6px",
                          }
                        : {
                            background: "white",
                            border: "1px solid rgba(0,0,0,0.08)",
                            borderBottomLeftRadius: "6px",
                          }
                    }
                  >
                    {message.parts.map((part, idx) => {
                      if (part.type === "thinking") {
                        return (
                          <div
                            key={idx}
                            className="mb-1.5 flex items-center gap-1.5 text-xs italic text-indigo-500"
                          >
                            <Sparkles className="h-3 w-3" />
                            <span>Berpikir...</span>
                          </div>
                        );
                      }
                      if (part.type === "text") {
                        return (
                          <div
                            key={idx}
                            className="whitespace-pre-wrap break-words"
                          >
                            {part.content}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-3 flex items-center gap-2.5"
                >
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #a855f7)",
                    }}
                  >
                    <Bot className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div
                    className="flex items-center gap-2 rounded-2xl px-4 py-3"
                    style={{
                      background: "white",
                      border: "1px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
                    <span className="text-xs text-gray-500">Mengetik...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3 bg-white"
              style={{
                borderTop: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik pesan..."
                disabled={isLoading}
                className="flex-1 rounded-xl border-0 bg-gray-100 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors focus:bg-gray-200 focus:ring-1 focus:ring-indigo-500/50 disabled:opacity-50"
                id="chat-input"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white transition-opacity disabled:opacity-30"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                }}
                aria-label="Send message"
                id="chat-send-button"
              >
                <Send className="h-4 w-4" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
