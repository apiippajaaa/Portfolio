import { notFound } from "next/navigation";
import data from "@/data/projects.json";
import Image from "next/image";
import Link from "next/link";

type ProjectItem = {
  title: string;
  slug: string;
  description?: string;
  image: string;
  link?: string;
  stack?: string[];
};

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = (data as { code: ProjectItem[] }).code.find(
    (item) => item.slug === slug
  );

  if (!project) return notFound();

  return (
    <div className=" text-white min-h-screen">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 pt-28 md:pt-36 space-y-10">
        <div className="space-y-5">
          <p className="text-[11px] tracking-[0.35em] uppercase text-zinc-500">
            Development
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            {project.title}
          </h1>

          <p className="text-zinc-400 max-w-xl">{project.description}</p>

          {/* STACK */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.stack?.map((item, i) => (
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
            <div className="pt-3">
              <Link
                href={project.link}
                target="_blank"
                className="text-sm text-white/80 hover:text-white border-b border-white/20"
              >
                View Project →
              </Link>
            </div>
          )}
        </div>

        {/* IMAGE */}
        <div className="overflow-hidden rounded-2xl">
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={600}
            className="w-full h-[260px] md:h-[420px] object-cover"
          />
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-5 md:px-10 py-20 space-y-16">
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-medium">Overview</h2>
          <p className="text-zinc-400 leading-relaxed">{project.description}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-medium">Process</h2>
          <p className="text-zinc-400 leading-relaxed">
            This project focuses on building a clean architecture, scalable
            system, and delivering smooth user experience.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-medium">Result</h2>
          <p className="text-zinc-400 leading-relaxed">
            High performance, responsive design, and seamless interaction.
          </p>
        </div>
      </section>

      {/* BACK */}
      <div className="max-w-4xl mx-auto px-5 md:px-10 pb-20">
        <Link
          href="/projects/explore"
          className="text-sm text-zinc-500 hover:text-white"
        >
          ← Back to Development
        </Link>
      </div>
    </div>
  );
}
