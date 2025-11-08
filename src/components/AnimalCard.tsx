import { motion } from "framer-motion";
import { Lock } from "lucide-react";

interface AnimalCardProps {
  animal: {
    id: number;
    name: string;
    icon: string;
    unlocked: boolean;
  };
}

export default function AnimalCard({ animal }: AnimalCardProps) {
  return (
    <motion.div
      whileHover={{ scale: animal.unlocked ? 1.05 : 1 }}
      className={`rounded-3xl p-6 border-4 shadow-lg ${
        animal.unlocked
          ? "bg-gradient-to-br from-yellow-100 to-pink-100 border-yellow-300"
          : "bg-gray-200/50 border-gray-300"
      }`}
    >
      <div className="text-center">
        <div className="text-7xl mb-4 relative">
          {animal.unlocked ? (
            animal.icon
          ) : (
            <div className="relative">
              <div className="blur-sm opacity-30">{animal.icon}</div>
              <Lock className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-12 text-gray-500" />
            </div>
          )}
        </div>
        <h3
          className={`text-xl font-bold ${
            animal.unlocked ? "text-purple-700" : "text-gray-500"
          }`}
        >
          {animal.unlocked ? animal.name : "???"}
        </h3>
        {animal.unlocked && (
          <p className="text-sm text-purple-600 mt-2">✨ Unlocked!</p>
        )}
      </div>
    </motion.div>
  );
}
