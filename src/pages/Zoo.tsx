import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimalCard from "@/components/AnimalCard";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { animals } from "@/data/animals";

export default function Zoo() {
  const { isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const unlockedAnimals = useQuery(api.animals.list);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 via-emerald-200 to-teal-300">
        <Loader2 className="h-12 w-12 animate-spin text-green-700" />
      </div>
    );
  }

  const unlockedIds = unlockedAnimals?.map((a) => a.animalId) || [];
  const animalsList = animals.map((animal) => ({
    ...animal,
    unlocked: unlockedIds.includes(animal.id),
  }));

  const unlockedCount = animalsList.filter((a) => a.unlocked).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-300 to-teal-400 flex flex-col relative overflow-hidden">
      {/* Animated clouds background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl md:text-6xl opacity-20"
            initial={{
              x: -100,
              y: Math.random() * 300,
            }}
            animate={{
              x: window.innerWidth + 100,
              y: Math.random() * 300,
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            ☁️
          </motion.div>
        ))}
      </div>

      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 max-w-7xl relative z-10">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="text-6xl md:text-8xl mb-4"
          >
            🦁
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg mb-3 md:mb-4">
            Your Virtual Zoo
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl text-white drop-shadow-md font-semibold"
          >
            {unlockedCount === 0 ? (
              "Complete tasks to start your collection! 🎯"
            ) : (
              <>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block"
                >
                  ✨
                </motion.span>
                {" "}You've collected {unlockedCount} amazing {unlockedCount === 1 ? "animal" : "animals"}!{" "}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="inline-block"
                >
                  ✨
                </motion.span>
              </>
            )}
          </motion.p>
        </motion.div>

        {/* Floating Sparkles Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Sparkles className="h-4 w-4 md:h-6 md:w-6 text-yellow-300 opacity-40" />
            </motion.div>
          ))}
        </div>

        {/* Zoo Display Area - Scenic Layout */}
        <div className="relative">
          {/* Ground/Grass effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/20 to-green-600/30 rounded-3xl" />
          
          {/* Animals Grid with enhanced spacing */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 relative z-10 p-4 md:p-8">
            {animalsList.map((animal, index) => (
              <motion.div
                key={animal.id}
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: index * 0.03,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <AnimalCard animal={animal} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {unlockedCount === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12 md:mt-16 bg-white/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border-4 border-white shadow-2xl max-w-2xl mx-auto"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="text-7xl md:text-9xl mb-6"
            >
              🎯
            </motion.div>
            <h2 className="text-2xl md:text-4xl font-black text-green-700 mb-4">
              Your Zoo Awaits!
            </h2>
            <p className="text-lg md:text-xl text-green-600">
              Complete tasks to unlock adorable animals and fill your zoo with friends!
            </p>
          </motion.div>
        )}

        {/* Celebration for unlocked animals */}
        {unlockedCount > 0 && unlockedCount < animals.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-12 md:mt-16"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="inline-block bg-gradient-to-r from-yellow-300 via-green-300 to-emerald-300 rounded-full px-6 md:px-8 py-3 md:py-4 border-4 border-white shadow-lg"
            >
              <p className="text-lg md:text-2xl font-black text-green-800">
                🎉 Keep going! More animals to discover! 🎉
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* All animals collected celebration */}
        {unlockedCount === animals.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-12 md:mt-16 bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 rounded-3xl p-8 md:p-12 border-4 border-white shadow-2xl max-w-2xl mx-auto"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="text-7xl md:text-9xl mb-6"
            >
              🏆
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-black text-purple-700 mb-4">
              Amazing! You Collected Them All!
            </h2>
            <p className="text-xl md:text-2xl text-purple-600">
              You're a true ZODO champion! 🌟
            </p>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}