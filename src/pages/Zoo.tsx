import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimalCard from "@/components/AnimalCard";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
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

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black text-purple-700 mb-4">
            Your Virtual Zoo 🦁
          </h1>
          <p className="text-xl text-purple-600">
            Collected: {unlockedCount} / {animals.length} animals
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {animalsList.map((animal, index) => (
            <motion.div
              key={animal.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <AnimalCard animal={animal} />
            </motion.div>
          ))}
        </div>

        {unlockedCount === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <p className="text-2xl text-purple-600">
              Complete tasks to unlock animals! 🎯
            </p>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
