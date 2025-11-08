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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200">
        <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
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
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-200 to-purple-200 flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 max-w-7xl">
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
          <h1 className="text-4xl md:text-6xl font-black text-purple-700 mb-3 md:mb-4">
            Your Virtual Zoo
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl text-purple-600 font-semibold"
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
                {" "}Amazing collection!{" "}
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
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
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
              <Sparkles className="h-4 w-4 md:h-6 md:w-6 text-yellow-400 opacity-30" />
            </motion.div>
          ))}
        </div>

        {/* Animals Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 relative z-10">
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

        {/* Empty State */}
        {unlockedCount === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12 md:mt-16 bg-white/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 border-4 border-white/50 shadow-xl max-w-2xl mx-auto"
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
            <h2 className="text-2xl md:text-4xl font-black text-purple-700 mb-4">
              Your Zoo Awaits!
            </h2>
            <p className="text-lg md:text-xl text-purple-600">
              Complete tasks to unlock adorable animals and fill your zoo with friends!
            </p>
          </motion.div>
        )}

        {/* Celebration for unlocked animals */}
        {unlockedCount > 0 && (
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
              className="inline-block bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full px-6 md:px-8 py-3 md:py-4 border-4 border-white/50 shadow-lg"
            >
              <p className="text-lg md:text-2xl font-black text-purple-700">
                🎉 Keep going! More animals to discover! 🎉
              </p>
            </motion.div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}