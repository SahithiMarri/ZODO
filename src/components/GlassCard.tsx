import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white/30 backdrop-blur-xl rounded-3xl p-6 border-2 border-white/50 shadow-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}
