import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";

import ProjectCard from "@/components/ProjectCard";

import type { ProjectItem } from "@/data/types";

afterEach(cleanup);

const baseProject: ProjectItem = {
  title: "Test Project",
  summary: "A short description of the project.",
  stack: ["TypeScript", "React"],
};

describe("ProjectCard", () => {
  it("renders the project title", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("renders the project summary", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText("A short description of the project.")).toBeInTheDocument();
  });

  it("renders all stack items", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("renders live and source links when provided", () => {
    const project: ProjectItem = {
      ...baseProject,
      url: "https://example.com",
      repo: "https://github.com/test/repo",
    };
    render(<ProjectCard project={project} />);

    const liveLink = screen.getByText("Live");
    expect(liveLink).toHaveAttribute("href", "https://example.com");
    expect(liveLink).toHaveAttribute("target", "_blank");

    const sourceLink = screen.getByText("Source");
    expect(sourceLink).toHaveAttribute("href", "https://github.com/test/repo");
  });

  it("does not render links when url and repo are omitted", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.queryByText("Live")).not.toBeInTheDocument();
    expect(screen.queryByText("Source")).not.toBeInTheDocument();
  });
});
