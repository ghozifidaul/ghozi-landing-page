import type { ExperienceItem } from "@/data/types";

type ExperienceListProps = {
  items: ExperienceItem[];
};

export default function ExperienceList({ items }: ExperienceListProps) {
  return (
    <div className="space-y-10">
      {items.map((item) => (
        <article key={`${item.company}-${item.role}`} className="group">
          <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
            <div>
              <h3 className="text-base font-medium text-fg">{item.role}</h3>
              <p className="text-sm text-muted">
                {item.company} &middot; {item.location}
              </p>
            </div>
            <time className="shrink-0 text-sm text-muted">
              {item.startDate} &ndash; {item.endDate}
            </time>
          </div>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-fg">
            {item.bullets.map((bullet, index) => (
              <li key={index} className="pl-4 relative before:absolute before:left-0 before:content-['--'] before:text-muted">
                {bullet}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
