import { render, screen, cleanup, within } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { createPortal } from "react-dom";

import type { ReactNode } from "react";

/**
 * Mock next/head so children portal into document.head (mirrors Next.js runtime).
 */
vi.mock("next/head", () => ({
  __esModule: true,
  default: function MockHead({ children }: { children: ReactNode }) {
    return createPortal(children, document.head);
  },
}));

import Home, { getStaticProps } from "@/pages/index";
import profile from "@/data/profile";

afterEach(() => {
  cleanup();
  document.head
    .querySelectorAll("meta, title, link, script")
    .forEach((el) => el.remove());
});

describe("Home page", () => {
  function renderHome() {
    return render(<Home profile={profile} />);
  }

  describe("getStaticProps", () => {
    it("returns the profile object in props", () => {
      const result = getStaticProps();
      expect(result).toEqual({ props: { profile } });
    });
  });

  describe("Hero section", () => {
    it("renders the profile name as an h1", () => {
      renderHome();
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent(profile.name);
    });

    it("renders the role as a subtitle", () => {
      renderHome();
      const header = screen.getByRole("banner");
      const subtitle = within(header).getByText(profile.role);
      expect(subtitle).toBeInTheDocument();
      expect(subtitle.tagName).toBe("P");
    });

    it("renders the bio text", () => {
      renderHome();
      expect(screen.getByText(profile.bio)).toBeInTheDocument();
    });
  });

  describe("Contact links", () => {
    it("renders an email link with mailto href", () => {
      renderHome();
      const emailLink = screen.getByRole("link", { name: "Email" });
      expect(emailLink).toHaveAttribute("href", `mailto:${profile.email}`);
    });

    it("renders a GitHub link with correct href and target", () => {
      renderHome();
      const link = screen.getByRole("link", { name: "GitHub" });
      expect(link).toHaveAttribute("href", profile.github);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("renders a LinkedIn link with correct href and target", () => {
      renderHome();
      const link = screen.getByRole("link", { name: "LinkedIn" });
      expect(link).toHaveAttribute("href", profile.linkedin);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("groups contact links in a nav with accessible label", () => {
      renderHome();
      const nav = screen.getByRole("navigation", { name: /contact links/i });
      expect(nav).toBeInTheDocument();
      expect(within(nav).getAllByRole("link")).toHaveLength(3);
    });
  });

  describe("Section headings", () => {
    it("renders Skills, Experience, and Projects section headings", () => {
      renderHome();
      expect(
        screen.getByRole("heading", { name: "Skills" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Experience" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Projects" }),
      ).toBeInTheDocument();
    });

    it("each section has an aria-labelledby linking to its heading", () => {
      const { container } = renderHome();
      const sections = container.querySelectorAll("section[aria-labelledby]");
      expect(sections).toHaveLength(3);

      sections.forEach((section) => {
        const labelledBy = section.getAttribute("aria-labelledby")!;
        const heading = section.querySelector(`#${labelledBy}`);
        expect(heading).not.toBeNull();
      });
    });
  });

  describe("Skills section", () => {
    it("renders all skill categories", () => {
      renderHome();
      for (const skill of profile.skills) {
        expect(screen.getByText(skill.category)).toBeInTheDocument();
      }
    });

    it("renders individual skill items", () => {
      renderHome();
      const allItems = profile.skills.flatMap((s) => s.items);
      for (const item of allItems) {
        expect(screen.getByText(item)).toBeInTheDocument();
      }
    });
  });

  describe("Experience section", () => {
    it("renders all experience roles and companies", () => {
      renderHome();
      // Use getAllByText since companies like "DigitSense" appear in multiple roles
      const uniqueCompanies = [...new Set(profile.experience.map((e) => e.company))];
      for (const company of uniqueCompanies) {
        const matches = screen.getAllByText(company, { exact: false });
        expect(matches.length).toBeGreaterThan(0);
      }
    });
  });

  describe("Projects section", () => {
    it("renders all project titles", () => {
      renderHome();
      for (const project of profile.projects) {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      }
    });

    it("renders all project summaries", () => {
      renderHome();
      for (const project of profile.projects) {
        expect(screen.getByText(project.summary)).toBeInTheDocument();
      }
    });
  });

  describe("Footer", () => {
    it("renders a copyright notice with the current year and name", () => {
      renderHome();
      const year = new Date().getFullYear().toString();
      const footer = screen.getByText(
        (content) => content.includes(year) && content.includes(profile.name),
      );
      expect(footer).toBeInTheDocument();
    });
  });

  describe("Main content landmark", () => {
    it("renders a main element with id main-content", () => {
      const { container } = renderHome();
      const main = container.querySelector("main#main-content");
      expect(main).not.toBeNull();
    });
  });

  describe("SEO head tags", () => {
    it("sets the document title to name -- role", () => {
      renderHome();
      const title = document.head.querySelector("title");
      expect(title).not.toBeNull();
      expect(title!.textContent).toBe(`${profile.name} -- ${profile.role}`);
    });

    it("renders JSON-LD structured data in the head", () => {
      renderHome();
      const script = document.head.querySelector(
        'script[type="application/ld+json"]',
      );
      expect(script).not.toBeNull();
      const data = JSON.parse(script!.textContent!);
      expect(data["@type"]).toBe("Person");
      expect(data.name).toBe(profile.name);
    });
  });
});
