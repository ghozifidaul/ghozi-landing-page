type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  id?: string;
};

export default function SectionHeading({ title, subtitle, id }: SectionHeadingProps) {
  return (
    <div className="mb-8">
      <h2 id={id} className="text-xl font-semibold tracking-tight text-fg">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      )}
    </div>
  );
}
