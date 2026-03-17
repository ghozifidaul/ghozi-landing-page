import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";

import ExperienceList from "@/components/ExperienceList";

import type { ExperienceItem } from "@/data/types";

afterEach(cleanup);

const items: ExperienceItem[] = [
  {
    role: "Senior Engineer",
    company: "Acme Corp",
    location: "Remote",
    startDate: "Jan 2023",
    endDate: "Present",
    bullets: [
      "Led migration to TypeScript across the frontend codebase.",
      "Improved CI pipeline speed by 40%.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Acme Corp",
    location: "New York, NY",
    startDate: "Mar 2021",
    endDate: "Dec 2022",
    bullets: ["Built component library used across 3 products."],
  },
];

describe("ExperienceList", () => {
  it("renders all experience entries", () => {
    render(<ExperienceList items={items} />);
    expect(screen.getByText("Senior Engineer")).toBeInTheDocument();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
  });

  it("renders each entry as an article element", () => {
    render(<ExperienceList items={items} />);
    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(2);
  });

  it("renders company and location for each entry", () => {
    render(<ExperienceList items={items} />);
    expect(screen.getByText(/Acme Corp · Remote/)).toBeInTheDocument();
    expect(screen.getByText(/Acme Corp · New York, NY/)).toBeInTheDocument();
  });

  it("renders date ranges inside time elements", () => {
    const { container } = render(<ExperienceList items={items} />);
    const timeElements = container.querySelectorAll("time");
    expect(timeElements).toHaveLength(2);
    expect(timeElements[0].textContent).toContain("Jan 2023");
    expect(timeElements[0].textContent).toContain("Present");
  });

  it("renders role as an h3 heading", () => {
    render(<ExperienceList items={items} />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveTextContent("Senior Engineer");
    expect(headings[1]).toHaveTextContent("Frontend Developer");
  });

  it("renders all bullet points for each entry", () => {
    render(<ExperienceList items={items} />);
    expect(
      screen.getByText("Led migration to TypeScript across the frontend codebase."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Improved CI pipeline speed by 40%."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Built component library used across 3 products."),
    ).toBeInTheDocument();
  });

  it("renders bullets as list items inside an unordered list", () => {
    const { container } = render(<ExperienceList items={items} />);
    const lists = container.querySelectorAll("ul");
    expect(lists).toHaveLength(2);
    expect(lists[0].querySelectorAll("li")).toHaveLength(2);
    expect(lists[1].querySelectorAll("li")).toHaveLength(1);
  });

  it("renders an empty container when given no items", () => {
    const { container } = render(<ExperienceList items={[]} />);
    const articles = container.querySelectorAll("article");
    expect(articles).toHaveLength(0);
  });
});
