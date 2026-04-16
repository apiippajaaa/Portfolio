"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const sections = [
  { id: "hero", icon: "home" },
  { id: "about", icon: "user" },
  { id: "projects", icon: "folder" },
  { id: "getInTouch", icon: "envelope" },
] as const;

const icons: Record<(typeof sections)[number]["icon"], React.ReactNode> = {
  home: (
    <svg viewBox="0 0 576 512" fill="currentColor" className="w-4 h-4">
      <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 35.5-28.7 64.2-64.2 64.2H127.5c-35.5 0-64.2-28.7-64.2-64.2l.7-160.2h-32c-17 0-32-14.1-32-32.1 0-9.6 4.4-18.6 12-24.6L266.7 7c12-9.8 29.3-9.8 41.3 0l255.8 223.9c7.6 6 12 15 12 24.6z" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 448 512" fill="currentColor" className="w-4 h-4">
      <path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z" />
    </svg>
  ),
  folder: (
    <svg viewBox="0 0 640 640" fill="currentColor" className="w-4 h-4">
      <path d="M88 289.6L64.4 360.2L64.4 160C64.4 124.7 93.1 96 128.4 96L267.1 96C280.9 96 294.4 100.5 305.5 108.8L343.9 137.6C349.4 141.8 356.2 144 363.1 144L480.4 144C515.7 144 544.4 172.7 544.4 208L544.4 224L179 224C137.7 224 101 250.4 87.9 289.6zM509.8 512L131 512C98.2 512 75.1 479.9 85.5 448.8L133.5 304.8C140 285.2 158.4 272 179 272L557.8 272C590.6 272 613.7 304.1 603.3 335.2L555.3 479.2C548.8 498.8 530.4 512 509.8 512z" />
    </svg>
  ),
  envelope: (
    <svg viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4">
      <path d="M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z" />
    </svg>
  ),
};

export default function SectionIndicator() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [active, setActive] = useState("hero");

  useEffect(() => {
    if (!isHome) return;

    const updateFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && sections.some((s) => s.id === hash)) {
        setActive(hash);
      }
    };

    // initial
    updateFromHash();

    // listen klik anchor (hashchange)
    window.addEventListener("hashchange", updateFromHash);

    // fallback realtime (karena replaceState ga trigger hashchange)
    const interval = setInterval(updateFromHash, 100);

    return () => {
      window.removeEventListener("hashchange", updateFromHash);
      clearInterval(interval);
    };
  }, [isHome]);

  if (!isHome) return null;

  return (
    <div className="hidden md:flex fixed left-10 top-1/2 -translate-y-1/2 z-50">
      <div className="relative flex flex-col items-center gap-2.5 px-2 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
        {sections.map(({ id, icon }) => {
          const isActive = active === id;

          return (
            <a
              key={id}
              href={`#${id}`}
              className="relative flex items-center justify-center w-8 h-8 group"
            >
              {isActive && (
                <motion.div
                  layoutId="indicator"
                  className="absolute w-8 h-8 rounded-full bg-white/10"
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 28,
                  }}
                />
              )}

              <div
                className={`relative z-10 transition-all duration-300 ${
                  isActive
                    ? "text-white scale-110"
                    : "text-white/30 group-hover:text-white/70"
                }`}
              >
                {icons[icon]}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
