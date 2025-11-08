import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import confetti from "canvas-confetti";

interface SurpriseBallProps {
  animal: { id: number; name: string; icon: string };
  onClose: () => void;
}

export default function SurpriseBall({ animal, onClose }: SurpriseBallProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FFD700", "#FF69B4", "#87CEEB", "#98FB98"],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 200);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-3xl p-8 max-w-md w-full shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {!isOpen ? (
            <div className="text-center">
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="text-9xl mb-6 cursor-pointer"
                onClick={handleOpen}
              >
                🎁
              </motion.div>
              <h2 className="text-3xl font-black text-white mb-4">
                Surprise Ball!
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Tap the gift to see what you unlocked!
              </p>
              <Button
                onClick={handleOpen}
                size="lg"
                className="bg-white text-purple-600 hover:bg-white/90 rounded-2xl text-xl font-bold px-8 py-6 cursor-pointer"
              >
                Open It! 🎉
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: 2,
                }}
                className="text-9xl mb-6"
              >
                {animal.icon}
              </motion.div>
              <h2 className="text-4xl font-black text-white mb-2">
                You Got a {animal.name}!
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Added to your Virtual Zoo! 🎊
              </p>
              <Button
                onClick={onClose}
                size="lg"
                className="bg-white text-purple-600 hover:bg-white/90 rounded-2xl text-xl font-bold px-8 py-6 cursor-pointer"
              >
                Awesome! ✨
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
