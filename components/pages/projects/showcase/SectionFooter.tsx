"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function SectionFooter({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50, scale: 0.96 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ amount: 0.3, margin: "-80px" }}
      transition={{ duration: 0.65, ease }}
      className="pt-8"
    >
      <Link href={link} className="group inline-block">
        <span className="relative inline-flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-white rounded-full border border-white/15 bg-white/5 backdrop-blur-md transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/30 group-hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] group-hover:scale-[1.03]">
          Explore all {title}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
          <span className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-300" />
        </span>
      </Link>
    </motion.div>
  );
}
