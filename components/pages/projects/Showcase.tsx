"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import data from "@/data/projects.json";

export default function ProjectShowcase() {
  const { featured, projects } = data;

  return (
    <section className="w-full max-w-6xl mx-auto mt-40 px-5 md:px-0">
      {/* ========================= */}
      {/* 🔥 FEATURED */}
      {/* ========================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-40"
      >
        <p className="text-[11px] tracking-[0.35em] text-zinc-500 uppercase">
          Featured Project
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div className="max-w-xl">
            <p className="text-xs text-zinc-500">{featured.meta}</p>

            <h2 className="mt-4 text-3xl md:text-5xl text-white font-medium leading-tight">
              {featured.title}
            </h2>

            <p className="mt-6 text-zinc-400 leading-relaxed">
              {featured.description}
            </p>

            {/* TECH */}
            <div className="mt-6 flex flex-wrap gap-2">
              {featured.tech?.map((tech, i) => (
                <span
                  key={i}
                  className="text-[11px] text-zinc-400 border border-zinc-700 px-2.5 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            <Link
              href={featured.link}
              className="mt-8 inline-flex items-center gap-2 text-sm text-white group"
            >
              <span className="opacity-70 group-hover:opacity-100 transition">
                View case study
              </span>
              <span className="group-hover:translate-x-1 transition">→</span>
            </Link>

            <div className="mt-10 h-px w-24 bg-zinc-700" />
          </div>

          {/* RIGHT */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-[260px] md:h-[420px] object-cover transition duration-1000 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-500" />
            </div>

            <div className="absolute -z-10 inset-0 scale-105 blur-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition duration-700 rounded-2xl" />
          </div>
        </div>
      </motion.div>

      {/* ========================= */}
      {/* 🧩 GRID */}
      {/* ========================= */}
      <div className="grid md:grid-cols-3 gap-10">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            viewport={{ once: true }}
            className={`group ${i === 0 ? "md:col-span-2" : ""}`}
          >
            <Link href={project.link} className="block">
              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[220px] md:h-[260px] object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-500" />
              </div>

              {/* CONTENT */}
              <div className="mt-5">
                <h3 className="text-white text-xl font-medium leading-snug">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-md">
                  {project.description}
                </p>

                {/* TECH */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] text-zinc-400 border border-zinc-700 px-2.5 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-5 flex items-center gap-2 text-sm text-white">
                  <span className="opacity-70 group-hover:opacity-100 transition">
                    View project
                  </span>
                  <span className="group-hover:translate-x-1 transition">
                    →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* ========================= */}
      {/* ✨ CTA — FLOWING STATEMENT */}
      {/* ========================= */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-48 md:mt-56 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto ">
          {/* flowing line */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-4xl md:text-6xl font-medium leading-tight text-white tracking-tight">
            <span className="text-zinc-500">
              Interested in working together?
            </span>

            <Link
              href="/#GetInTouch"
              className="group inline-flex items-center gap-3 relative"
            >
              {/* text */}
              <span className="relative">
                Let’s talk
                {/* underline anim */}
                <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-white group-hover:w-full transition-all duration-500" />
              </span>

              {/* arrow */}
              <span className="transform group-hover:translate-x-2 transition duration-300">
                →
              </span>
            </Link>
          </div>

          {/* subtle secondary line */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-sm text-zinc-500 max-w-md"
          >
            Open for collaboration, freelance projects, or full-time roles.
          </motion.p>

          {/* divider */}
          {/* <div className="mt-12 h-px w-full bg-zinc-800" /> */}
        </div>
      </motion.div>
    </section>
  );
}
