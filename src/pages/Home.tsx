import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TaskCreator from "@/components/TaskCreator";
import TaskList from "@/components/TaskList";
import SurpriseBall from "@/components/SurpriseBall";
import { motion } from "framer-motion";
import { Loader2, Flame, Star } from "lucide-react";
import { toast } from "sonner";
import { animals } from "@/data/animals";
import { Id } from "@/convex/_generated/dataModel";

export default function Home() {
  const { isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showSurprise, setShowSurprise] = useState(false);
  const [currentAnimal, setCurrentAnimal] = useState<typeof animals[0] | null>(null);

  const tasks = useQuery(api.tasks.list);
  const unlockedAnimals = useQuery(api.animals.list);
  const progress = useQuery(api.progress.get);

  const createTask = useMutation(api.tasks.create);
  const completeTask = useMutation(api.tasks.complete);
  const deleteTask = useMutation(api.tasks.remove);
  const unlockAnimal = useMutation(api.animals.unlock);
  const updateXP = useMutation(api.progress.updateXP);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  const handleCreateTask = async (title: string, deadline: string) => {
    try {
      await createTask({ title, deadline });
      toast.success("Task added! 🎯");
    } catch (error) {
      toast.error("Failed to add task");
    }
  };

  const handleCompleteTask = async (id: string) => {
    try {
      await completeTask({ id: id as Id<"tasks"> });
      await updateXP({ amount: 10 });

      const unlockedIds = unlockedAnimals?.map((a) => a.animalId) || [];
      const nextAnimal = animals.find((a) => !unlockedIds.includes(a.id));

      if (nextAnimal) {
        await unlockAnimal({
          animalId: nextAnimal.id,
          name: nextAnimal.name,
          icon: nextAnimal.icon,
        });
        setCurrentAnimal(nextAnimal);
        setShowSurprise(true);
      } else {
        toast.success("Task completed! +10 XP 🌟");
      }
    } catch (error) {
      toast.error("Failed to complete task");
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask({ id: id as Id<"tasks"> });
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200">
        <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
      </div>
    );
  }

  const xp = progress?.xp || 0;
  const streak = progress?.streak || 0;
  const xpProgress = (xp % 100) / 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black text-purple-700 mb-4 text-center">
            Welcome Back! 🎉
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-orange-200 to-red-200 rounded-3xl p-6 border-4 border-white/50 shadow-lg">
              <div className="flex items-center gap-3">
                <Flame className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-sm text-orange-700 font-semibold">Streak</p>
                  <p className="text-3xl font-black text-orange-600">{streak} days</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-200 to-amber-200 rounded-3xl p-6 border-4 border-white/50 shadow-lg">
              <div className="flex items-center gap-3">
                <Star className="h-8 w-8 text-yellow-600" />
                <div className="flex-1">
                  <p className="text-sm text-yellow-700 font-semibold">XP Progress</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/50 rounded-full h-4 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${xpProgress * 100}%` }}
                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
                      />
                    </div>
                    <span className="text-xl font-black text-yellow-600">{xp}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mb-8">
          <TaskCreator onCreateTask={handleCreateTask} />
        </div>

        <div>
          <TaskList
            tasks={tasks || []}
            onComplete={handleCompleteTask}
            onDelete={handleDeleteTask}
          />
        </div>
      </main>

      <Footer />

      {showSurprise && currentAnimal && (
        <SurpriseBall
          animal={currentAnimal}
          onClose={() => {
            setShowSurprise(false);
            setCurrentAnimal(null);
          }}
        />
      )}
    </div>
  );
}
