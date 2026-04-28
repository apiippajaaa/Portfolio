import { notFound } from "next/navigation";
import data from "@/data/projects.json";
import Image from "next/image";
import Link from "next/link";

/* ================= TYPE ================= */
type ProjectItem = {
  title: string;
  slug: string;
  description?: string;
  heroImage: string;
  images?: string[];
  stack: string[];
  link?: string;
};

/* ================= PAGE ================= */
export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ FIX WAJIB (unwrap params)
  const { slug } = await params;

  const project = (data as { code: ProjectItem[] }).code.find(
    (item) => item.slug === slug
  );

  if (!project) return notFound();

  return (
    <div className="text-white">
      {/* ================= HERO ================= */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 pt-28 md:pt-36 space-y-10">
        <div className="space-y-6 text-center md:text-left">
          <p className="text-[11px] tracking-[0.35em] uppercase text-zinc-500">
            Development
          </p>

          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-zinc-400 max-w-2xl mx-auto md:mx-0">
            {project.description}
          </p>

          {/* STACK */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
            {project.stack.map((item, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-300"
              >
                {item}
              </span>
            ))}
          </div>

          {/* CTA */}
          {project.link && (
            <div className="pt-4">
              <Link
                href={project.link}
                target="_blank"
                className="inline-block text-sm text-white/80 hover:text-white border-b border-white/20"
              >
                View Live →
              </Link>
            </div>
          )}
        </div>

        {/* HERO IMAGE */}
        <div className="relative overflow-hidden rounded-3xl">
          <Image
            src={project.heroImage}
            alt={project.title}
            width={1400}
            height={800}
            className="w-full h-[300px] md:h-[520px] object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      {project.images && project.images.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 md:px-10 py-24 space-y-6">
          <h2 className="text-xl md:text-2xl font-medium">Preview</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {project.images.map((img, i) => (
              <div key={i} className="overflow-hidden rounded-2xl group">
                <Image
                  src={img}
                  alt={`preview-${i}`}
                  width={800}
                  height={500}
                  className="w-full h-[240px] md:h-[320px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= BACK ================= */}
      <div className="max-w-4xl mx-auto px-5 md:px-10 pb-24">
        <Link
          href="/projects/explore"
          className="text-sm text-zinc-500 hover:text-white transition"
        >
          ← Back to Development
        </Link>
      </div>
    </div>
  );
}
