import type { ProjectItem } from "@/data/types";

type ProjectCardProps = {
  project: ProjectItem;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-lg border border-border p-5 transition-colors hover:bg-surface">
      <h3 className="text-base font-medium text-fg">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {project.summary}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
          >
            {tech}
          </span>
        ))}
      </div>
      {(project.url || project.repo) && (
        <div className="mt-4 flex gap-4 text-sm">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-muted"
            >
              Live
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-muted"
            >
              Source
            </a>
          )}
        </div>
      )}
    </article>
  );
}
