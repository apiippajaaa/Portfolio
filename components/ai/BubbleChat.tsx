"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  role: "user" | "ai";
  text: string;
};

type ChatHistory = {
  role: "user" | "assistant";
  content: string;
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

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

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

  const [history, setHistory] = useState<ChatHistory[]>([]);
  const [projectContext, setProjectContext] = useState("");

  // ================= SEND =================
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    const userMsg: ChatHistory = {
      role: "user",
      content: userMessage,
    };

    const newHistory = [...history, userMsg];

    // UI
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setHistory(newHistory);

    // 🔥 detect requirement
    if (/requirement|kebutuhan|job desc|project/i.test(userMessage)) {
      setProjectContext(userMessage);
    }

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: newHistory,
          projectContext,
        }),
      });

      const data = await res.json();

      const aiMsg: ChatHistory = {
        role: "assistant",
        content: data.reply,
      };

      setHistory((prev) => [...prev, aiMsg]);

      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);

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
      {/* ================= INTRO ================= */}
      <AnimatePresence>
        {showIntro && !open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-24 right-6 z-[999] max-w-[260px]"
          >
            <div
              className="
              relative px-4 py-3 rounded-2xl

              bg-white/80 dark:bg-neutral-900/80
              backdrop-blur-xl

              border border-black/10 dark:border-white/10

              shadow-[0_10px_30px_rgba(0,0,0,0.15)]
              dark:shadow-[0_10px_30px_rgba(0,0,0,0.6)]

              text-sm text-neutral-800 dark:text-neutral-200
            "
            >
              halo saya afif’s assistant, apakah anda perlu bantuan?
              <div className="absolute -bottom-2 right-6 w-4 h-4 rotate-45 bg-white dark:bg-neutral-900 border-r border-b border-black/10 dark:border-white/10" />
              <button
                onClick={closeIntro}
                className="
                absolute top-2 right-2 text-xs

                text-neutral-400 hover:text-red-500
                transition-colors
              "
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FLOAT BUTTON ================= */}
      <motion.button
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => {
          setOpen(!open);
          closeIntro();
          playSound();
        }}
        className="
        fixed bottom-6 right-6 z-[999]
        w-12 h-12 rounded-full

        bg-white/80 dark:bg-neutral-900/80
        text-black dark:text-white

        backdrop-blur-xl
        border border-black/10 dark:border-white/10

        shadow-[0_8px_30px_rgba(0,0,0,0.15)]
        dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]

        hover:bg-white dark:hover:bg-neutral-800
        hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)]

        flex items-center justify-center cursor-pointer
        transition-all duration-300
      "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          <path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1" />
        </svg>
      </motion.button>

      {/* ================= CHAT PANEL ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            className="
            fixed bottom-20 right-6 w-[340px] h-[500px]

            flex flex-col overflow-hidden rounded-[28px]

            bg-white/75 dark:bg-neutral-900/75
            backdrop-blur-2xl

            border border-black/10 dark:border-white/10

            shadow-[0_20px_60px_rgba(0,0,0,0.15)]
            dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]

            z-[999]
          "
          >
            {/* HEADER */}
            <div
              className="
              px-4 py-3 text-sm flex items-center justify-between

              border-b border-black/5 dark:border-white/10

              text-neutral-700 dark:text-neutral-200
              font-medium

              bg-white/40 dark:bg-neutral-900/40
              backdrop-blur-md
            "
            >
              <span>Afif Assistant</span>
              <button
                onClick={() => setOpen(false)}
                className="text-neutral-400 hover:text-red-500 transition-colors"
              >
                ✕
              </button>
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
                    className={`
                    max-w-[78%] px-4 py-2.5 rounded-2xl

                    ${
                      msg.role === "user"
                        ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                        : "bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-sm text-neutral-800 dark:text-neutral-200"
                    }
                  `}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="text-xs text-neutral-400 animate-pulse">
                  Typing...
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
                className="
                flex-1 px-4 py-2 text-sm rounded-full

                bg-white/70 dark:bg-neutral-800/70
                backdrop-blur-md

                border border-black/10 dark:border-white/10

                text-neutral-800 dark:text-neutral-200
                placeholder:text-neutral-400 dark:placeholder:text-neutral-500

                focus:outline-none
                focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20

                transition-all
              "
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />

              <button
                onClick={sendMessage}
                className="
                px-4 py-2 text-sm rounded-full

                bg-neutral-900 text-white
                dark:bg-white dark:text-neutral-900

                hover:bg-neutral-700 dark:hover:bg-neutral-200

                transition-all duration-300 cursor-pointer
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
