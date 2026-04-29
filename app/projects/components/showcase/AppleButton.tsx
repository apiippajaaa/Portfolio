"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

type Props = {
  href: string;
  label: string;
  variants?: Variants;
};

export default function AppleButton({ href, label, variants }: Props) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="flex justify-center mt-10"
    >
      <Link
        href={href}
        className="text-sm text-white/80 hover:text-white transition px-5 py-2 rounded-full border border-white/10 bg-white/3 hover:bg-white/6"
      >
        {label}
      </Link>
    </motion.div>
  );
}
