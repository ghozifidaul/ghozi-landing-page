import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "mock-geist-sans" }),
  Geist_Mono: () => ({ variable: "mock-geist-mono" }),
}));

import Layout from "@/components/Layout";

afterEach(cleanup);

describe("Layout", () => {
  it("renders children content", () => {
    render(
      <Layout>
        <p>Page content</p>
      </Layout>,
    );
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });

  it("renders a skip-to-content link", () => {
    render(
      <Layout>
        <main>Content</main>
      </Layout>,
    );
    const skipLink = screen.getByText("Skip to main content");
    expect(skipLink).toBeInTheDocument();
    expect(skipLink.tagName).toBe("A");
    expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  it("applies font CSS variable classes to the wrapper", () => {
    const { container } = render(
      <Layout>
        <p>Content</p>
      </Layout>,
    );
    const wrapper = container.firstElementChild;
    expect(wrapper).not.toBeNull();
    expect(wrapper!.className).toContain("mock-geist-sans");
    expect(wrapper!.className).toContain("mock-geist-mono");
  });
});
