import SeoHead from "@/components/SeoHead";
import SectionHeading from "@/components/SectionHeading";
import SkillList from "@/components/SkillList";
import ExperienceList from "@/components/ExperienceList";
import ProjectCard from "@/components/ProjectCard";
import profile from "@/data/profile";

export default function Home() {
  return (
    <>
      <SeoHead profile={profile} />

      <div className="mx-auto max-w-2xl px-6 py-20">
        {/* Hero */}
        <header className="mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-fg">
            {profile.name}
          </h1>
          <p className="mt-1 text-base text-muted">{profile.role}</p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-fg">
            {profile.bio}
          </p>
          <nav className="mt-4 flex gap-4 text-sm" aria-label="Contact links">
            <a
              href={`mailto:${profile.email}`}
              className="underline underline-offset-4 transition-colors hover:text-muted"
            >
              Email
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-muted"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-muted"
            >
              LinkedIn
            </a>
          </nav>
        </header>

        <main id="main-content">
          {/* Skills */}
          <section className="mb-16" aria-labelledby="skills-heading">
            <SectionHeading id="skills-heading" title="Skills" />
            <SkillList skills={profile.skills} />
          </section>

          {/* Experience */}
          <section className="mb-16" aria-labelledby="experience-heading">
            <SectionHeading id="experience-heading" title="Experience" />
            <ExperienceList items={profile.experience} />
          </section>

          {/* Projects */}
          <section className="mb-16" aria-labelledby="projects-heading">
            <SectionHeading id="projects-heading" title="Projects" />
            <div className="grid gap-4 sm:grid-cols-2">
              {profile.projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </section>
        </main>

        <footer className="border-t border-border pt-8 text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} {profile.name}</p>
        </footer>
      </div>
    </>
  );
}
