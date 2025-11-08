import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, Heart, Trophy } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-4xl font-black text-white drop-shadow-lg">ZODO</span>
            <span className="text-3xl">🎮</span>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="rounded-2xl border-2 border-white bg-white/20 text-white hover:bg-white/30 font-bold cursor-pointer"
            >
              Log In
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              className="rounded-2xl bg-white text-purple-600 hover:bg-white/90 font-bold cursor-pointer"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="text-8xl mb-6"
          >
            🎯
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg">
            Make Tasks Fun!
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Complete tasks, unlock cute animals, and build awesome habits with ZODO!
          </p>
          <Button
            onClick={() => navigate("/signup")}
            size="lg"
            className="rounded-3xl bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white text-2xl font-black px-12 py-8 shadow-2xl cursor-pointer"
          >
            Start Your Adventure! 🚀
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: <Target className="h-12 w-12" />,
              emoji: "🎯",
              title: "Fun Tasks",
              desc: "Turn boring chores into exciting missions!",
            },
            {
              icon: <Sparkles className="h-12 w-12" />,
              emoji: "🐾",
              title: "Collect Animals",
              desc: "Unlock adorable creatures as you complete tasks!",
            },
            {
              icon: <Heart className="h-12 w-12" />,
              emoji: "💜",
              title: "Self Care",
              desc: "Meditate and journal to feel your best!",
            },
            {
              icon: <Trophy className="h-12 w-12" />,
              emoji: "🏆",
              title: "Build Streaks",
              desc: "Keep going and watch your streak grow!",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border-4 border-white/50 shadow-xl text-center"
            >
              <div className="text-5xl mb-4">{feature.emoji}</div>
              <h3 className="text-2xl font-black text-purple-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-purple-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-white/80 text-lg">
            Join thousands of kids making productivity fun! 🌟
          </p>
        </motion.div>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-white/70">
        <p>© {new Date().getFullYear()} ZODO - Made with 💜 for awesome kids!</p>
      </footer>
    </div>
  );
}