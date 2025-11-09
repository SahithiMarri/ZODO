import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import MicButton from "./MicButton";
import { useSpeechToText } from "@/hooks/useSpeechToText";
import { motion } from "framer-motion";

interface TaskCreatorProps {
  onCreateTask: (title: string, deadline: string) => void;
}

export default function TaskCreator({ onCreateTask }: TaskCreatorProps) {
  const [title, setTitle] = useState("");
  const { isListening, transcript, isSupported, startListening, resetTranscript } =
    useSpeechToText();

  useEffect(() => {
    if (transcript) {
      setTitle(transcript);
      resetTranscript();
    }
  }, [transcript, resetTranscript]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const year = tomorrow.getFullYear();
      const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const day = String(tomorrow.getDate()).padStart(2, '0');
      const deadline = `${year}-${month}-${day}`;
      onCreateTask(title, deadline);
      setTitle("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/40 backdrop-blur-xl rounded-3xl p-4 md:p-6 border-2 border-white/50 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl md:text-3xl">✨</span>
        <h2 className="text-xl md:text-2xl font-bold text-purple-700">Create a Task</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSupported && (
          <div className="flex justify-center mb-4">
            <MicButton
              isListening={isListening}
              onClick={startListening}
              disabled={isListening}
            />
          </div>
        )}
        
        <div className="flex items-center gap-2 md:gap-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={isSupported ? "Tap mic or type your task..." : "Type your task..."}
            className="flex-1 text-base md:text-lg h-12 md:h-14 rounded-2xl border-2 border-purple-300 focus:border-purple-500"
            required
          />
          <Button
            type="submit"
            size="lg"
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-2xl h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-bold shadow-lg cursor-pointer"
          >
            <Plus className="h-5 w-5 md:h-6 md:w-6 md:mr-2" />
            <span className="hidden md:inline">Add</span>
          </Button>
        </div>
      </form>

      {!isSupported && (
        <p className="text-xs md:text-sm text-purple-600 mt-2 text-center">
          💡 Voice input not available in your browser. Type instead!
        </p>
      )}
    </motion.div>
  );
}