"use client";

import { motion, Variants } from "framer-motion";

type Props = {
  label: string;
  title: string;
  subtitle: string;
  variants?: Variants;
};

export default function SectionHeader({
  label,
  title,
  subtitle,
  variants,
}: Props) {
  return (
    <motion.div
      variants={variants}
      className="text-center md:text-left space-y-4"
    >
      <p className="text-[11px] tracking-[0.35em] uppercase text-zinc-500">
        {label}
      </p>

      <div className="space-y-3 md:border-l md:border-white/20 md:pl-5">
        <h2 className="text-3xl md:text-5xl font-semibold text-white">
          {title}
        </h2>

        <p className="text-zinc-400 text-sm md:text-base max-w-md mx-auto md:mx-0">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}
