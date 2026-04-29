"use client";

import { motion } from "framer-motion";

type Props = {
  url: string | null;
  onClose: () => void;
};

export default function VideoModal({ url, onClose }: Props) {
  if (!url) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    >
      <motion.div initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }}>
        <iframe
          src={url}
          className="w-[90vw] md:w-[900px] aspect-video rounded-xl"
          allowFullScreen
        />
      </motion.div>
    </motion.div>
  );
}
