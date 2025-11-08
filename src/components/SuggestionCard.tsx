import { motion } from "framer-motion";

interface SuggestionCardProps {
  suggestion: {
    id: number;
    title: string;
    text: string;
    icon: string;
  };
  index: number;
}

export default function SuggestionCard({ suggestion, index }: SuggestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-xl rounded-3xl p-6 border-4 border-white/50 shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className="text-5xl">{suggestion.icon}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-purple-700 mb-2">
            {suggestion.title}
          </h3>
          <p className="text-gray-700 leading-relaxed">{suggestion.text}</p>
        </div>
      </div>
    </motion.div>
  );
}
