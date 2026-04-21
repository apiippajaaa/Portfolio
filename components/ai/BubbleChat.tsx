"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function BubbleChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hi 👋 I'm Afif's AI. Ask me anything about him!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "AI unavailable 😅" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="
          fixed bottom-6 right-6 z-[999]
          w-12 h-12 rounded-full
          bg-black/90 dark:bg-white/10
          text-white backdrop-blur-md
          shadow-lg flex items-center justify-center
          hover:scale-105 transition
        "
      >
        💬
      </button>

      {/* CHAT PANEL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="
              fixed bottom-20 right-6
              w-[340px] h-[480px]
              flex flex-col overflow-hidden
              rounded-3xl
              backdrop-blur-xl
              shadow-2xl
              border
              bg-white/80 dark:bg-neutral-900/70
              border-black/5 dark:border-white/10
              z-[999]
            "
          >
            {/* HEADER */}
            <div
              className="
              px-4 py-3 text-sm font-medium
              flex items-center justify-between
              border-b border-black/5 dark:border-white/10
              text-black dark:text-white
            "
            >
              <span>Afif's Assistant</span>

              <button
                onClick={() => setOpen(false)}
                className="opacity-60 hover:opacity-100"
              >
                ✕
              </button>
            </div>

            {/* MESSAGES */}
            <div
              className="
              flex-1 overflow-y-auto
              px-4 py-3 space-y-3
              text-sm
            "
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      max-w-[80%]
                      px-3 py-2
                      rounded-2xl
                      text-sm leading-relaxed
                      ${
                        msg.role === "user"
                          ? `
                            bg-black text-white
                            dark:bg-white dark:text-black
                            rounded-br-md
                          `
                          : `
                            bg-gray-100 text-black
                            dark:bg-neutral-800 dark:text-white
                            rounded-bl-md
                          `
                      }
                    `}
                  >
                    {/* 🔥 MARKDOWN RENDER */}
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <p className="mb-1">{children}</p>,
                        strong: ({ children }) => (
                          <strong className="font-semibold">{children}</strong>
                        ),
                        li: ({ children }) => (
                          <li className="list-decimal ml-4">{children}</li>
                        ),
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}

              {loading && (
                <div
                  className="
                  text-xs opacity-50
                  animate-pulse
                "
                >
                  Typing...
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* INPUT */}
            <div
              className="
              p-3 border-t
              border-black/5 dark:border-white/10
              flex gap-2
            "
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message..."
                className="
                  flex-1 px-3 py-2 text-sm
                  rounded-full outline-none
                  bg-gray-100 text-black
                  dark:bg-neutral-800 dark:text-white
                  focus:ring-2
                  focus:ring-black/10 dark:focus:ring-white/10
                "
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />

              <button
                onClick={sendMessage}
                className="
                  px-4 py-2 text-sm
                  rounded-full
                  bg-black text-white
                  dark:bg-white dark:text-black
                  hover:opacity-90 transition
                "
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
