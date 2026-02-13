import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="relative h-48 overflow-hidden bg-muted">
          {project.imageUrl ? (
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 text-primary/20">
              {/* Abstract pattern or icon could go here */}
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm2 0v12h12V6H6z" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
             {/* Overlay content if needed */}
          </div>
        </div>
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold font-serif">{project.title}</h3>
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow space-y-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {project.description}
          </p>
          
          {project.impact && (
            <div className="text-sm font-medium text-primary/90 bg-primary/5 p-2 rounded border border-primary/10">
              Impact: {project.impact}
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies?.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs font-mono">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 pb-6 gap-2">
          {project.link && (
            <Button asChild size="sm" className="w-full gap-2" variant="default">
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                View Project
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
