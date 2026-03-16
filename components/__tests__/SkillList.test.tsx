import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";

import SkillList from "@/components/SkillList";

import type { Skill } from "@/data/types";

afterEach(cleanup);

const skills: Skill[] = [
  { category: "Frontend", items: ["React", "TypeScript"] },
  { category: "Backend", items: ["Node.js", "Python"] },
];

describe("SkillList", () => {
  it("renders all category headings", () => {
    render(<SkillList skills={skills} />);
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
  });

  it("renders category headings as h3 elements", () => {
    render(<SkillList skills={skills} />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveTextContent("Frontend");
    expect(headings[1]).toHaveTextContent("Backend");
  });

  it("renders all skill items within each category", () => {
    render(<SkillList skills={skills} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
  });

  it("renders an empty container when given no skills", () => {
    const { container } = render(<SkillList skills={[]} />);
    const headings = container.querySelectorAll("h3");
    expect(headings).toHaveLength(0);
  });
});
