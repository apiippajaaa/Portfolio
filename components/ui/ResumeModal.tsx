"use client";

import { motion, AnimatePresence } from "framer-motion";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const resumes = [
  {
    label: "Bahasa Indonesia",
    file: "/resume-id.pdf",
  },
  {
    label: "English",
    file: "/resume-en.pdf",
  },
];

export default function ResumeModal({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.25 }}
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            w-[90%] max-w-md rounded-2xl p-6
            bg-white/5 backdrop-blur-xl
            border border-white/10
            shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
          >
            {/* HEADER */}
            <div className="text-center mb-5">
              <h2 className="text-lg font-semibold text-white">Resume</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Select your preferred language
              </p>
            </div>

            {/* OPTIONS */}
            <div className="space-y-3">
              {resumes.map((res) => (
                <div
                  key={res.file}
                  className="flex items-center justify-between gap-3 
                  bg-white/5 hover:bg-white/10
                  border border-white/10
                  p-3 rounded-xl transition"
                >
                  <span className="text-sm text-zinc-200">{res.label}</span>

                  <div className="flex gap-2">
                    {/* VIEW */}
                    <a
                      href={res.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-xs rounded-lg 
                      bg-white text-black 
                      hover:opacity-90 transition"
                    >
                      View
                    </a>

                    {/* DOWNLOAD */}
                    <a
                      href={res.file}
                      download
                      className="px-3 py-1 text-xs rounded-lg 
                      border border-white/20 
                      text-zinc-200 
                      hover:bg-white/10 transition"
                    >
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* CLOSE */}
            <button
              onClick={onClose}
              className="mt-5 w-full py-2 text-sm rounded-xl 
              bg-white/10 hover:bg-white/20 
              text-white transition"
            >
              Close
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
