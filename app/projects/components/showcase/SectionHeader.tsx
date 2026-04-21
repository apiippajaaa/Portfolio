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
    <div className="space-y-4">
      <p className="text-[11px] tracking-[0.35em] text-zinc-500 uppercase">
        {categoryLabel}
      </p>

      <div className="border-l-2 border-white pl-4">
        <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
          {title}
        </h2>

        <p className="mt-2 text-zinc-500 text-sm max-w-md leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
