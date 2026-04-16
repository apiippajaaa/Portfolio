"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function GetInTouch() {
  return (
    <section className="py-28 md:py-36 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* TEXT */}
          <p
            className="
              text-xl md:text-2xl
              font-light
              text-zinc-300
              leading-relaxed
            "
          >
            If you’re interested in working together or just want to connect,
          </p>

          {/* CTA */}
          <Link href="/#GetInTouch" className="inline-block group">
            <span
              className="
                text-2xl md:text-3xl
                font-medium
                text-white
                tracking-tight
                relative
              "
            >
              let’s get in touch
              {/* underline animation */}
              <span
                className="
                  absolute left-0 -bottom-1 h-px w-full
                  bg-white
                  scale-x-0
                  origin-left
                  transition-transform duration-300
                  group-hover:scale-x-100
                "
              />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
