import { Mic, MicOff } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface MicButtonProps {
  isListening: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function MicButton({ isListening, onClick, disabled }: MicButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        onClick={onClick}
        disabled={disabled}
        size="lg"
        className={`rounded-full w-16 h-16 ${
          isListening
            ? "bg-red-500 hover:bg-red-600 animate-pulse"
            : "bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        } shadow-xl cursor-pointer`}
      >
        {isListening ? (
          <MicOff className="h-8 w-8 text-white" />
        ) : (
          <Mic className="h-8 w-8 text-white" />
        )}
      </Button>
    </motion.div>
  );
}
