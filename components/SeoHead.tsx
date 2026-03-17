import Head from "next/head";

import type { Profile } from "@/data/types";

type SeoHeadProps = {
  profile: Profile;
  siteUrl?: string;
};

export default function SeoHead({ profile, siteUrl = "https://ghozi-landing-page.vercel.app" }: SeoHeadProps) {
  const title = `${profile.name} -- ${profile.role}`;
  const description = profile.bio;
  const ogImage = `${siteUrl}/ss-landing-page.webp`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: profile.bio,
    url: siteUrl,
    email: `mailto:${profile.email}`,
    image: `${siteUrl}/ghozifidaul.webp`,
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: profile.skills.flatMap((skill) => skill.items),
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {profile.keywords && profile.keywords.length > 0 && (
        <meta name="keywords" content={profile.keywords.join(", ")} />
      )}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content={profile.name} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${profile.name} personal website preview`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Theme */}
      <meta name="theme-color" content="#0a0a0a" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}
