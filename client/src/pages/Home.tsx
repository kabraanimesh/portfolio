import {
  useProfile,
  useSkills,
  useExperience,
  useProjects,
} from "@/hooks/use-portfolio";
import { Navigation } from "@/components/Navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { ExperienceItem } from "@/components/ExperienceItem";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillBadge } from "@/components/SkillBadge";
import { ContactForm } from "@/components/ContactForm";
import {
  Loader2,
  Linkedin,
  Mail,
  MapPin,
  Github,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const { data: skills, isLoading: isSkillsLoading } = useSkills();
  const { data: experience, isLoading: isExpLoading } = useExperience();
  const { data: projects, isLoading: isProjectsLoading } = useProjects();

  const isLoading =
    isProfileLoading || isSkillsLoading || isExpLoading || isProjectsLoading;

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // Group skills by category
  const skillsByCategory = skills?.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skills>,
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation resumeUrl={profile?.resumeUrl} />

      {/* HERO SECTION */}
      <section
        id="about"
        className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl z-0" />

        <div className="container px-4 md:px-6 z-10 relative">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <motion.div
              className="flex-1 text-center md:text-left space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                Available for new opportunities
              </div> */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-foreground">
                Hi, I'm <br />
                <span className="text-primary">
                  {profile?.name || "Developer"}
                </span>
              </h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground font-light">
                {profile?.title || "Full Stack Developer"}
              </h2>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto md:mx-0 leading-relaxed">
                {profile?.summary ||
                  "Building exceptional digital experiences."}
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                <Button size="lg" className="rounded-full px-8" asChild>
                  <a href="#contact">Get in Touch</a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 gap-2"
                  asChild
                >
                  <a href="#projects">
                    View Work <ArrowDown className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="flex gap-4 justify-center md:justify-start pt-8 text-muted-foreground">
                {profile?.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                )}
                <a
                  href={`mailto:${profile?.email}`}
                  className="hover:text-primary transition-colors"
                >
                  <Mail className="h-6 w-6" />
                </a>
                <div className="flex items-center gap-2 text-sm border-l pl-4 border-border ml-2">
                  <MapPin className="h-4 w-4" />
                  {profile?.location}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />
                <div className="absolute inset-4 rounded-full border border-primary/10" />

                {/* Image Placeholder or Actual Image */}
                <div className="absolute inset-2 rounded-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 shadow-2xl">
                  {/* Fallback avatar if no image provided */}
                  <div className="w-full h-full flex items-center justify-center text-4xl font-serif font-bold text-muted-foreground/50">
                    {profile?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "AK"}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <SectionHeading
            title="Professional Journey"
            subtitle="My career path and professional milestones."
          />

          <div className="max-w-4xl mx-auto mt-12">
            {experience
              ?.sort((a, b) => a.order - b.order)
              .map((job, idx) => (
                <ExperienceItem
                  key={job.id}
                  experience={job}
                  index={idx}
                  isLast={idx === experience.length - 1}
                />
              ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-20">
        <div className="container px-4 md:px-6">
          <SectionHeading
            title="Technical Arsenal"
            subtitle="Technologies and tools I work with to bring ideas to life."
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {Object.entries(skillsByCategory || {}).map(
              ([category, categorySkills], idx) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-card rounded-xl p-6 shadow-sm border border-border/50"
                >
                  <h3 className="text-lg font-bold mb-6 text-primary flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {categorySkills.map((skill, i) => (
                      <SkillBadge
                        key={skill.id}
                        name={skill.name}
                        proficiency={skill.proficiency || 100}
                        index={i}
                      />
                    ))}
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <SectionHeading
            title="Featured Projects"
            subtitle="A selection of my best work and side projects."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {projects?.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-top-left -z-10" />
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
              <SectionHeading
                title="Let's Work Together"
                subtitle="Have a project in mind or just want to say hi? I'd love to hear from you."
                className="mb-8"
              />
              <div className="space-y-6 text-lg text-muted-foreground">
                {/* <p>
                  I'm currently available for freelance projects and open to
                  full-time opportunities.
                </p> */}

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Email
                      </p>
                      <a
                        href={`mailto:${profile?.email}`}
                        className="hover:text-primary transition-colors"
                      >
                        {profile?.email}
                      </a>
                    </div>
                  </div>

                  {profile?.linkedin && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Linkedin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          LinkedIn
                        </p>
                        <a
                          href={profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          Connect on LinkedIn
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border bg-background text-center text-sm text-muted-foreground">
        <div className="container px-4">
          <p>
            © {new Date().getFullYear()} {profile?.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
