import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { createPortal } from "react-dom";

import type { ReactNode } from "react";

/**
 * Mock next/head so children portal into document.head.
 */
vi.mock("next/head", () => ({
  __esModule: true,
  default: function MockHead({ children }: { children: ReactNode }) {
    return createPortal(children, document.head);
  },
}));

import NotFound from "@/pages/404";

afterEach(() => {
  cleanup();
  document.head
    .querySelectorAll("meta, title, link, script")
    .forEach((el) => el.remove());
});

describe("404 page", () => {
  it("renders the 404 status code", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders a 'Page not found' heading", () => {
    render(<NotFound />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Page not found");
  });

  it("renders an explanatory message", () => {
    render(<NotFound />);
    expect(
      screen.getByText(
        /the page you are looking for does not exist or has been moved/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders a link back to the home page", () => {
    render(<NotFound />);
    const link = screen.getByRole("link", { name: /back to home/i });
    expect(link).toHaveAttribute("href", "/");
  });

  it("sets the document title to 404 -- Page Not Found", () => {
    render(<NotFound />);
    const title = document.head.querySelector("title");
    expect(title).not.toBeNull();
    expect(title!.textContent).toBe("404 -- Page Not Found");
  });

  it("sets robots meta to noindex, nofollow", () => {
    render(<NotFound />);
    const meta = document.head.querySelector('meta[name="robots"]');
    expect(meta).not.toBeNull();
    expect(meta!.getAttribute("content")).toBe("noindex, nofollow");
  });
});
