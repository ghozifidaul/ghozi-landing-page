import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";

import SectionHeading from "@/components/SectionHeading";

afterEach(cleanup);

describe("SectionHeading", () => {
  it("renders the title", () => {
    render(<SectionHeading title="Skills" />);
    expect(screen.getByText("Skills")).toBeInTheDocument();
  });

  it("renders title as an h2 element", () => {
    render(<SectionHeading title="Experience" />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Experience");
  });

  it("renders the subtitle when provided", () => {
    render(<SectionHeading title="Projects" subtitle="Things I have built" />);
    expect(screen.getByText("Things I have built")).toBeInTheDocument();
  });

  it("does not render a subtitle when omitted", () => {
    const { container } = render(<SectionHeading title="Skills" />);
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs).toHaveLength(0);
  });

  it("sets the id attribute on the heading when provided", () => {
    render(<SectionHeading title="Skills" id="skills-heading" />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveAttribute("id", "skills-heading");
  });

  it("does not set an id attribute when omitted", () => {
    render(<SectionHeading title="Skills" />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).not.toHaveAttribute("id");
  });
});
