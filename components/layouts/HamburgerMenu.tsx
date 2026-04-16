"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/#getInTouch" },
  ];

  return (
    <>
      {/* 🔘 BUTTON */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.95 }}
        className="relative z-50 w-11 h-11 flex items-center justify-center 
        rounded-2xl border border-white/10 
        bg-white/[0.05] backdrop-blur-xl
        hover:bg-white/[0.12] transition-colors duration-200"
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          {/* TOP LINE */}
          <motion.span
            animate={{
              width: open ? "22px" : "22px",
              rotate: open ? 45 : 0,
              y: open ? 0 : -5,
              x: open ? 0 : 0, // push ke kanan saat close
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute h-[1.5px] bg-white rounded-full origin-center"
          />

          {/* BOTTOM LINE */}
          <motion.span
            animate={{
              width: "22px",
              rotate: open ? -45 : 0,
              y: open ? 0 : 5,
              x: open ? 0 : 0, // sudah full width → tetap kanan
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute h-[1.5px] bg-white rounded-full origin-center"
          />
        </div>
      </motion.button>

      {/* 🌌 OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex items-center justify-center 
            bg-black/70 backdrop-blur-2xl"
          >
            <nav className="flex flex-col items-center gap-8">
              {menu.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group text-3xl md:text-4xl 
                    font-light tracking-[-0.02em] 
                    text-white/70 hover:text-white"
                  >
                    <span className="relative">
                      {item.name}
                      <span
                        className="absolute left-0 -bottom-1 h-[1px] w-0 
                        bg-white transition-all duration-300 
                        group-hover:w-full"
                      />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
