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
  const [showIntro, setShowIntro] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [canPlaySound, setCanPlaySound] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hi 👋 I'm Afif's Assistant. Ask me anything.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // ================= AUTO SCROLL =================
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ================= INTRO =================
  useEffect(() => {
    setMounted(true);

    const seen = localStorage.getItem("chat_intro_seen");
    if (!seen) {
      setTimeout(() => setShowIntro(true), 800);
    }
  }, []);

  // ================= ENABLE SOUND =================
  useEffect(() => {
    const enable = () => {
      setCanPlaySound(true);
      window.removeEventListener("click", enable);
    };

    window.addEventListener("click", enable);
    return () => window.removeEventListener("click", enable);
  }, []);

  const playSound = () => {
    if (!canPlaySound) return;

    const audio = new Audio("/sounds/pop.mp3");
    audio.volume = 0.4;
    audio.play().catch(() => {});
  };

  const closeIntro = () => {
    setShowIntro(false);
    localStorage.setItem("chat_intro_seen", "true");
  };

  // ================= SEND =================
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

      // 🔊 sound saat AI reply
      playSound();
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
      {/* ================= INTRO BUBBLE ================= */}
      <AnimatePresence>
        {showIntro && !open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-24 right-6 z-[999] max-w-[260px]"
          >
            <div className="relative px-4 py-3 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-xl text-sm text-black dark:text-white">
              halo saya afif’s assistant, apakah anda perlu bantuan?
              <div className="absolute -bottom-2 right-6 w-4 h-4 rotate-45 bg-white dark:bg-neutral-900 border-r border-b border-black/5 dark:border-white/10" />
              <button
                onClick={closeIntro}
                className="absolute top-2 right-2 text-xs opacity-50 hover:opacity-100"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FLOAT BUTTON ================= */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={mounted ? { scale: [0, 1.2, 1, 1.05, 1], opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setOpen(!open);
          closeIntro();

          // 🔊 sound saat buka chat
          playSound();
        }}
        className="fixed bottom-6 right-6 z-[999] w-12 h-12 rounded-full bg-black text-white dark:bg-white dark:text-black shadow-xl flex items-center justify-center"
      >
        💬
      </motion.button>

      {/* ================= CHAT PANEL ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            className="fixed bottom-20 right-6 w-[340px] h-[500px] flex flex-col overflow-hidden rounded-[28px] backdrop-blur-2xl shadow-2xl border bg-white/70 dark:bg-neutral-900/70 border-black/5 dark:border-white/10 z-[999]"
          >
            {/* HEADER */}
            <div className="px-4 py-3 text-sm flex items-center justify-between border-b border-black/5 dark:border-white/10 text-black dark:text-white font-medium">
              <span>Afif Assistant</span>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-sm">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[78%] px-4 py-2.5 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-neutral-100 dark:bg-neutral-800"
                    }`}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="text-xs opacity-50 animate-pulse">
                  Thinking...
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* INPUT */}
            <div className="p-3 border-t border-black/5 dark:border-white/10 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message..."
                className="flex-1 px-4 py-2 text-sm rounded-full bg-neutral-100 dark:bg-neutral-800 outline-none"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />

              <button
                onClick={sendMessage}
                className="px-4 py-2 text-sm rounded-full bg-black text-white dark:bg-white dark:text-black"
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
