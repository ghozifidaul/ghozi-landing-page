import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { createPortal } from "react-dom";

import type { ReactNode } from "react";

/**
 * Mock next/head to portal children into document.head.
 * This mirrors the real Next.js runtime behavior in jsdom.
 */
vi.mock("next/head", () => {
  return {
    __esModule: true,
    default: function MockHead({ children }: { children: ReactNode }) {
      return createPortal(children, document.head);
    },
  };
});

import SeoHead from "@/components/SeoHead";

import type { Profile } from "@/data/types";

afterEach(() => {
  cleanup();
  // Remove tags injected into document.head by our mock
  document.head
    .querySelectorAll("meta, title, link, script")
    .forEach((el) => el.remove());
});

const mockProfile: Profile = {
  name: "Jane Doe",
  role: "Software Engineer",
  location: "San Francisco, CA",
  bio: "Full-stack developer building great products.",
  email: "jane@example.com",
  github: "https://github.com/janedoe",
  linkedin: "https://linkedin.com/in/janedoe",
  keywords: ["React", "TypeScript", "Next.js"],
  skills: [
    { category: "Frontend", items: ["React", "TypeScript"] },
    { category: "Backend", items: ["Node.js"] },
  ],
  experience: [],
  projects: [],
};

const siteUrl = "https://example.com";

function renderSeoHead(props?: { profile?: Profile; siteUrl?: string }) {
  return render(
    <SeoHead
      profile={props?.profile ?? mockProfile}
      siteUrl={props?.siteUrl ?? siteUrl}
    />,
  );
}

function getMeta(attr: string, value: string): HTMLMetaElement | null {
  return document.head.querySelector(`meta[${attr}="${value}"]`);
}

function getLink(rel: string): HTMLLinkElement | null {
  return document.head.querySelector(`link[rel="${rel}"]`);
}

describe("SeoHead", () => {
  it("renders a title element with profile name and role", () => {
    renderSeoHead();
    const title = document.head.querySelector("title");
    expect(title).not.toBeNull();
    expect(title!.textContent).toBe("Jane Doe -- Software Engineer");
  });

  it("renders meta description from profile bio", () => {
    renderSeoHead();
    const meta = getMeta("name", "description");
    expect(meta).not.toBeNull();
    expect(meta!.content).toBe("Full-stack developer building great products.");
  });

  it("renders meta keywords when provided", () => {
    renderSeoHead();
    const meta = getMeta("name", "keywords");
    expect(meta).not.toBeNull();
    expect(meta!.content).toBe("React, TypeScript, Next.js");
  });

  it("does not render meta keywords when array is empty", () => {
    const profileNoKeywords: Profile = { ...mockProfile, keywords: [] };
    renderSeoHead({ profile: profileNoKeywords });
    const meta = getMeta("name", "keywords");
    expect(meta).toBeNull();
  });

  it("does not render meta keywords when omitted", () => {
    const profileOmitted: Profile = { ...mockProfile, keywords: undefined };
    renderSeoHead({ profile: profileOmitted });
    const meta = getMeta("name", "keywords");
    expect(meta).toBeNull();
  });

  it("renders robots meta tag with index, follow", () => {
    renderSeoHead();
    const meta = getMeta("name", "robots");
    expect(meta).not.toBeNull();
    expect(meta!.content).toBe("index, follow");
  });

  it("renders canonical link with the site URL", () => {
    renderSeoHead();
    const link = getLink("canonical");
    expect(link).not.toBeNull();
    expect(link!.getAttribute("href")).toBe("https://example.com");
  });

  describe("Open Graph tags", () => {
    it("renders og:type as website", () => {
      renderSeoHead();
      const meta = getMeta("property", "og:type");
      expect(meta).not.toBeNull();
      expect(meta!.content).toBe("website");
    });

    it("renders og:title matching the page title", () => {
      renderSeoHead();
      const meta = getMeta("property", "og:title");
      expect(meta).not.toBeNull();
      expect(meta!.content).toBe("Jane Doe -- Software Engineer");
    });

    it("renders og:description matching the bio", () => {
      renderSeoHead();
      const meta = getMeta("property", "og:description");
      expect(meta).not.toBeNull();
      expect(meta!.content).toBe(mockProfile.bio);
    });

    it("renders og:url with the site URL", () => {
      renderSeoHead();
      const meta = getMeta("property", "og:url");
      expect(meta).not.toBeNull();
      expect(meta!.content).toBe(siteUrl);
    });

    it("renders og:site_name as the profile name", () => {
      renderSeoHead();
      const meta = getMeta("property", "og:site_name");
      expect(meta).not.toBeNull();
      expect(meta!.content).toBe("Jane Doe");
    });

    it("renders og:image with the correct URL", () => {
      renderSeoHead();
      const meta = getMeta("property", "og:image");
      expect(meta).not.toBeNull();
      expect(meta!.content).toBe("https://example.com/ss-landing-page.webp");
    });

    it("renders og:image:alt with descriptive text", () => {
      renderSeoHead();
      const meta = getMeta("property", "og:image:alt");
      expect(meta).not.toBeNull();
      expect(meta!.content).toBe("Jane Doe personal website preview");
    });

    it("renders og:image:width and og:image:height", () => {
      renderSeoHead();
      const width = getMeta("property", "og:image:width");
      const height = getMeta("property", "og:image:height");
      expect(width).not.toBeNull();
      expect(height).not.toBeNull();
      expect(width!.content).toBe("1200");
      expect(height!.content).toBe("630");
    });

    it("renders og:locale as en_US", () => {
      renderSeoHead();
      const meta = getMeta("property", "og:locale");
      expect(meta).not.toBeNull();
      expect(meta!.content).toBe("en_US");
    });
  });

  describe("Twitter Card tags", () => {
    it("renders twitter:card as summary_large_image", () => {
      renderSeoHead();
      const meta = getMeta("name", "twitter:card");
      expect(meta).not.toBeNull();
      expect(meta!.content).toBe("summary_large_image");
    });

    it("renders twitter:title matching the page title", () => {
      renderSeoHead();
      const meta = getMeta("name", "twitter:title");
      expect(meta).not.toBeNull();
      expect(meta!.content).toBe("Jane Doe -- Software Engineer");
    });

    it("renders twitter:description matching the bio", () => {
      renderSeoHead();
      const meta = getMeta("name", "twitter:description");
      expect(meta).not.toBeNull();
      expect(meta!.content).toBe(mockProfile.bio);
    });

    it("renders twitter:image with the correct URL", () => {
      renderSeoHead();
      const meta = getMeta("name", "twitter:image");
      expect(meta).not.toBeNull();
      expect(meta!.content).toBe("https://example.com/ss-landing-page.webp");
    });
  });

  describe("JSON-LD structured data", () => {
    function getJsonLd() {
      const script = document.head.querySelector(
        'script[type="application/ld+json"]',
      );
      expect(script).not.toBeNull();
      return JSON.parse(script!.textContent!);
    }

    it("renders a Person schema with correct context", () => {
      renderSeoHead();
      const data = getJsonLd();
      expect(data["@context"]).toBe("https://schema.org");
      expect(data["@type"]).toBe("Person");
    });

    it("includes name, jobTitle, and description", () => {
      renderSeoHead();
      const data = getJsonLd();
      expect(data.name).toBe("Jane Doe");
      expect(data.jobTitle).toBe("Software Engineer");
      expect(data.description).toBe(mockProfile.bio);
    });

    it("includes url and email", () => {
      renderSeoHead();
      const data = getJsonLd();
      expect(data.url).toBe(siteUrl);
      expect(data.email).toBe("mailto:jane@example.com");
    });

    it("includes profile image URL", () => {
      renderSeoHead();
      const data = getJsonLd();
      expect(data.image).toBe("https://example.com/ghozifidaul.webp");
    });

    it("includes sameAs links for GitHub and LinkedIn", () => {
      renderSeoHead();
      const data = getJsonLd();
      expect(data.sameAs).toEqual([
        "https://github.com/janedoe",
        "https://linkedin.com/in/janedoe",
      ]);
    });

    it("includes knowsAbout from skill items", () => {
      renderSeoHead();
      const data = getJsonLd();
      expect(data.knowsAbout).toEqual(["React", "TypeScript", "Node.js"]);
    });

    it("includes address with locality", () => {
      renderSeoHead();
      const data = getJsonLd();
      expect(data.address).toEqual({
        "@type": "PostalAddress",
        addressLocality: "San Francisco, CA",
      });
    });
  });

  it("renders theme-color meta tag", () => {
    renderSeoHead();
    const meta = getMeta("name", "theme-color");
    expect(meta).not.toBeNull();
    expect(meta!.content).toBe("#0a0a0a");
  });

  it("uses default siteUrl when not provided", () => {
    render(<SeoHead profile={mockProfile} />);
    const link = getLink("canonical");
    expect(link).not.toBeNull();
    expect(link!.getAttribute("href")).toBe(
      "https://ghozi-landing-page.vercel.app",
    );
  });
});
