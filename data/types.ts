export type Skill = {
  category: string;
  items: string[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
};

export type ProjectItem = {
  title: string;
  summary: string;
  stack: string[];
  url?: string;
  repo?: string;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  keywords?: string[];
  skills: Skill[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
};
