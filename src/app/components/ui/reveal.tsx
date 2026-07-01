import { motion } from "motion/react";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  width?: "fit-content" | "100%";
}

export function Reveal({ 
  children, 
  delay = 0, 
  direction = "up", 
  className = "",
  width = "100%"
}: RevealProps) {
  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction], filter: "blur(12px)", scale: 0.97 }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: 0.9, 
        ease: [0.16, 1, 0.3, 1],
        delay: delay 
      }}
      className={className}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
}
