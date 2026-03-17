import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";

import ErrorBoundary from "@/components/ErrorBoundary";

afterEach(cleanup);

import type { JSX } from "react";

function ProblemChild(): JSX.Element {
  throw new Error("Test error");
}

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <p>Safe content</p>
      </ErrorBoundary>,
    );
    expect(screen.getByText("Safe content")).toBeInTheDocument();
  });

  it("renders fallback UI when a child throws", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText("An unexpected error occurred. Please refresh the page to try again."),
    ).toBeInTheDocument();
    consoleSpy.mockRestore();
  });

  it("renders a try again button in the fallback", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Try again")).toBeInTheDocument();
    consoleSpy.mockRestore();
  });

  it("renders custom fallback when provided", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary fallback={<div>Custom error message</div>}>
        <ProblemChild />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Custom error message")).toBeInTheDocument();
    expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
    consoleSpy.mockRestore();
  });
});
