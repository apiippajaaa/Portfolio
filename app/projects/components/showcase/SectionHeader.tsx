type Props = {
  title: string;
  subtitle: string;
  type: "code" | "design" | "video";
};

export default function SectionHeader({ title, subtitle, type }: Props) {
  const categoryLabel =
    type === "code"
      ? "Engineering"
      : type === "design"
      ? "Visual Craft"
      : "Motion";

  return (
    <div className="space-y-6 md:space-y-4 text-center md:text-left">
      {/* CATEGORY */}
      <p className="text-[11px] tracking-[0.35em] text-zinc-500 uppercase">
        {categoryLabel}
      </p>

      {/* MOBILE LINE LEFT RIGHT */}
      <div className="flex items-center justify-center gap-3 md:hidden">
        <div className="h-px w-10 bg-white/40" />
        <div className="h-px w-10 bg-white/40" />
      </div>

      {/* CONTENT */}
      <div
        className="
          border-l-0 pl-0
          md:border-l-2 md:border-white md:pl-4
        "
      >
        {/* TITLE */}
        <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
          {title}
        </h2>

        {/* SUBTITLE */}
        <p className="mt-2 text-zinc-500 text-sm max-w-md leading-relaxed mx-auto md:mx-0">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
