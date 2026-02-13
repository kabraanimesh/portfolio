import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface SkillBadgeProps {
  name: string;
  proficiency: number;
  index: number;
}

export function SkillBadge({ name, proficiency, index }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="group relative">
        <Badge 
          variant="outline" 
          className="px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 transition-colors cursor-default"
        >
          {name}
        </Badge>
        {/* Tooltip-like proficiency indicator */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          {proficiency}% Proficiency
        </div>
      </div>
    </motion.div>
  );
}
