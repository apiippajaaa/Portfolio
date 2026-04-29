import data from "@/data/projects.json";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectShowcase from "../../components/ProjectImages";

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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ unwrap params (Next.js terbaru)
  const { slug } = await params;

  const projects = (data as { code: ProjectItem[] }).code;

  const project = projects.find((item) => item.slug === slug);

  // ✅ handle 404
  if (!project) return notFound();

  return (
    <div className="text-white">
      {/* ================= HERO ================= */}
      <section className="max-w-6xl mx-auto px-4 md:px-10 pt-20 md:pt-32 space-y-10">
        <div className="space-y-5 text-center md:text-left">
          <p className="text-[11px] tracking-[0.35em] uppercase text-zinc-500">
            Development
          </p>

          <h1 className="text-3xl md:text-6xl font-semibold tracking-tight">
            {project.title}
          </h1>

          {project.description && (
            <p className="text-zinc-400 max-w-xl mx-auto md:mx-0">
              {project.description}
            </p>
          )}

          {/* STACK */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
            {project.stack.map((item, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5"
              >
                {item}
              </span>
            ))}
          </div>

          {/* LIVE LINK */}
          {project.link && (
            <Link
              href={project.link}
              target="_blank"
              className="inline-block text-sm mt-2 border-b border-white/20 hover:text-white/80 transition"
            >
              View Live →
            </Link>
          )}
        </div>

        {/* HERO IMAGE */}
        <div className="relative w-full h-65 md:h-130 rounded-3xl overflow-hidden">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            quality={70}
            className="object-cover"
          />
        </div>
      </section>

      {/* ================= GALLERY (CLIENT) ================= */}
      {project.images && project.images.length > 0 && (
        <ProjectShowcase images={project.images} />
      )}
    </div>
  );
}
