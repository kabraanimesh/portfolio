import { motion } from "framer-motion";
import { Calendar, Building2, Trophy } from "lucide-react";
import type { Experience } from "@shared/schema";

interface ExperienceItemProps {
  experience: Experience;
  index: number;
  isLast: boolean;
}

export function ExperienceItem({ experience, index, isLast }: ExperienceItemProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 md:pl-0"
    >
      <div className="md:grid md:grid-cols-12 md:gap-8">
        {/* Timeline Line (Desktop) */}
        <div className="hidden md:flex md:col-span-1 justify-center relative">
          <div className="h-full w-px bg-border absolute top-0 left-1/2 -translate-x-1/2"></div>
          <div className="w-4 h-4 rounded-full bg-primary border-4 border-background z-10 mt-1.5"></div>
        </div>

        {/* Timeline Line (Mobile) */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:hidden"></div>
        <div className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background md:hidden"></div>

        {/* Date Column */}
        <div className="md:col-span-3 text-sm text-muted-foreground font-mono mb-2 md:mb-0 md:text-right md:pt-1">
          <div className="inline-flex items-center gap-2 md:justify-end">
            <Calendar className="h-4 w-4" />
            {experience.period}
          </div>
        </div>

        {/* Content Column */}
        <div className="md:col-span-8 pb-12">
          <div className="flex flex-col gap-1 mb-3">
            <h3 className="text-xl font-bold text-foreground">{experience.role}</h3>
            <div className="flex items-center gap-2 text-primary font-medium">
              <Building2 className="h-4 w-4" />
              {experience.company}
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {experience.description}
          </p>

          {experience.achievements && experience.achievements.length > 0 && (
            <ul className="space-y-2">
              {experience.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Trophy className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}
