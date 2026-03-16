import type { Profile } from "@/data/types";

const profile: Profile = {
  name: "Ghozi Fidaul H",
  role: "AI Product Engineer",
  location: "West Java, Indonesia",
  bio: "Software engineer focused on building AI-powered products, performant web applications, and cross-platform mobile apps. Experienced across the full stack from LLM integration and cloud infrastructure to polished user interfaces.",
  email: "ghozifidaul@gmail.com",
  github: "https://github.com/ghozifidaul",
  linkedin: "https://linkedin.com/in/ghozifidaul",

  skills: [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
    },
    {
      category: "Mobile",
      items: ["React Native", "Flutter", "iOS", "Android"],
    },
    {
      category: "Backend & Cloud",
      items: ["Python", "Java", "AWS", "Azure"],
    },
  ],

  experience: [
    {
      role: "AI Product Engineer",
      company: "DigitSense",
      location: "Hong Kong, Remote",
      startDate: "Mar 2025",
      endDate: "Present",
      bullets: [
        "Architected and deployed an AI Education Assistant using Azure OpenAI, streamlining learning workflows for students with disabilities.",
        "Engineered custom Speech-to-Text and Text-to-Speech pipelines on Azure to enable seamless voice-controlled interactions.",
        "Optimized LLM performance through prompt engineering and latency tuning, resulting in faster, more accurate educational tutoring.",
        "Developed SEO-optimized marketing site and infrastructure on AWS, increasing organic reach for AI meeting tools company.",
      ],
    },
    {
      role: "Front End & Mobile App Developer",
      company: "DigitSense",
      location: "Hong Kong, Remote",
      startDate: "Jun 2023",
      endDate: "Mar 2025",
      bullets: [
        "Modernized a global fashion brand's legacy sales portal using Next.js and Tailwind CSS, improving UI accessibility for senior users.",
        "Boosted Core Web Vitals for the agency's primary marketing site, enhancing site speed and search engine rankings.",
        "Developed a high-conversion Shopify App with interactive React components to improve customer retention and sales.",
        "Designed and implemented scalable APIs to support high-traffic retail applications, ensuring 99.9% uptime during peak sales.",
      ],
    },
    {
      role: "Mobile App Developer",
      company: "DigitSense",
      location: "Hong Kong, Remote",
      startDate: "Aug 2022",
      endDate: "Jun 2023",
      bullets: [
        "Engineered an assistive mobile app (iOS/Android) for visually impaired users in Singapore using React Native.",
        "Integrated spatial audio and Google Maps API to provide real-time, voice-controlled navigation cues.",
      ],
    },
    {
      role: "Mobile App Developer",
      company: "PT Inovasi Cipta Teknologi",
      location: "Indonesia",
      startDate: "Jun 2020",
      endDate: "Aug 2022",
      bullets: [
        "Developed and published 20+ cross-platform apps integrated with banking APIs for transparent financial tracking using Flutter.",
        "Managed the full mobile development lifecycle, from UI/UX implementation to App Store/Play Store submissions for 20+ clients.",
      ],
    },
    {
      role: "Mobile App Developer",
      company: "Sultan Agung Islamic University",
      location: "Indonesia",
      startDate: "Aug 2019",
      endDate: "Aug 2022",
      bullets: [
        "Boosted employee attendance by 20% by architecting a location-based attendance system using Flutter with a scalable Laravel backend supporting 1,000+ users.",
        "Developed a high-performance web app featuring a Major Recommendation engine, helping high school students align interests with university programs.",
      ],
    },
  ],

  projects: [
    {
      title: "Scrap Monitoring Web App",
      summary: "Digitalized the monitoring process for a warehouse in a mining company, replacing manual tracking with a streamlined web-based system.",
      stack: ["Web", "Monitoring", "Mining Industry"],
    },
    {
      title: "Korean Global Scholarship Program",
      summary: "Selected as a campus representative for a foreign exchange semester at Dongseo University in Busan, South Korea.",
      stack: ["Exchange Program", "Dongseo University"],
    },
  ],
};

export default profile;
