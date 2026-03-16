import type { Skill } from "@/data/types";

type SkillListProps = {
  skills: Skill[];
};

export default function SkillList({ skills }: SkillListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill) => (
        <div key={skill.category}>
          <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-muted">
            {skill.category}
          </h3>
          <ul className="space-y-1">
            {skill.items.map((item) => (
              <li key={item} className="text-sm text-fg">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
