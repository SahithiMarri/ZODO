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
  const [deadline, setDeadline] = useState("");
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
    if (title.trim() && deadline) {
      onCreateTask(title, deadline);
      setTitle("");
      setDeadline("");
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border-2 border-white/50 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">✨</span>
        <h2 className="text-2xl font-bold text-purple-700">Create a Task</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3">
          {isSupported && (
            <MicButton
              isListening={isListening}
              onClick={startListening}
              disabled={isListening}
            />
          )}
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={isSupported ? "Tap mic or type your task..." : "Type your task..."}
            className="flex-1 text-lg h-14 rounded-2xl border-2 border-purple-300 focus:border-purple-500"
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <Input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            min={getTomorrowDate()}
            className="flex-1 text-lg h-14 rounded-2xl border-2 border-purple-300 focus:border-purple-500 cursor-pointer"
            required
          />
          <Button
            type="submit"
            size="lg"
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-2xl h-14 px-8 text-lg font-bold shadow-lg cursor-pointer"
          >
            <Plus className="h-6 w-6 mr-2" />
            Add
          </Button>
        </div>
      </form>

      {!isSupported && (
        <p className="text-sm text-purple-600 mt-2">
          💡 Voice input not available in your browser. Type instead!
        </p>
      )}
    </motion.div>
  );
}
