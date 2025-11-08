import { motion } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";

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
      whileHover={animal.unlocked ? { scale: 1.08, rotate: [0, -2, 2, 0] } : { scale: 1 }}
      whileTap={animal.unlocked ? { scale: 0.95 } : {}}
      className={`relative rounded-3xl p-4 md:p-6 border-4 shadow-xl transition-all duration-300 ${
        animal.unlocked
          ? "bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 border-yellow-400 cursor-pointer"
          : "bg-gray-200/50 border-gray-300"
      }`}
    >
      {/* Sparkle effect for unlocked animals */}
      {animal.unlocked && (
        <>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute -top-2 -right-2 z-10"
          >
            <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />
          </motion.div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1,
            }}
            className="absolute -bottom-2 -left-2 z-10"
          >
            <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-pink-500" />
          </motion.div>
        </>
      )}

      <div className="text-center">
        <motion.div
          animate={
            animal.unlocked
              ? {
                  y: [0, -8, 0],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-5xl md:text-7xl mb-3 md:mb-4 relative"
        >
          {animal.unlocked ? (
            animal.icon
          ) : (
            <div className="relative">
              <div className="blur-sm opacity-30">{animal.icon}</div>
              <Lock className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 md:h-12 md:w-12 text-gray-500" />
            </div>
          )}
        </motion.div>
        <h3
          className={`text-base md:text-xl font-bold ${
            animal.unlocked ? "text-purple-700" : "text-gray-500"
          }`}
        >
          {animal.unlocked ? animal.name : "???"}
        </h3>
        {animal.unlocked && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs md:text-sm text-purple-600 mt-1 md:mt-2 font-semibold"
          >
            ✨ Unlocked!
          </motion.p>
        )}
      </div>

      {/* Glow effect for unlocked animals */}
      {animal.unlocked && (
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-300/20 to-pink-300/20 pointer-events-none"
        />
      )}
    </motion.div>
  );
}