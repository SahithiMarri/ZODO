import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Save, BookOpen } from "lucide-react";
import MicButton from "./MicButton";
import { useSpeechToText } from "@/hooks/useSpeechToText";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface JournalEntry {
  _id: string;
  content: string;
  _creationTime: number;
}

interface JournalBoxProps {
  entries: JournalEntry[];
  onSave: (content: string) => void;
}

export default function JournalBox({ entries, onSave }: JournalBoxProps) {
  const [content, setContent] = useState("");
  const [showEntries, setShowEntries] = useState(false);
  const { isListening, transcript, isSupported, startListening, resetTranscript } =
    useSpeechToText();

  useEffect(() => {
    if (transcript) {
      setContent((prev) => (prev ? prev + " " + transcript : transcript));
      resetTranscript();
    }
  }, [transcript, resetTranscript]);

  const handleSave = () => {
    if (content.trim()) {
      onSave(content);
      setContent("");
      toast.success("Journal entry saved! 📝");
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-pink-100 to-yellow-100 rounded-3xl p-6 md:p-8 border-4 border-white/50 shadow-xl"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl md:text-3xl font-black text-purple-700 mb-2">
          My Journal 📔
        </h3>
        <p className="text-sm md:text-base text-purple-600">Write or speak your thoughts!</p>
      </div>

      <div className="bg-white/50 rounded-3xl p-4 md:p-6 mb-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="How are you feeling today? What made you happy?"
          className="min-h-[150px] text-base md:text-lg rounded-2xl border-2 border-purple-300 focus:border-purple-500 mb-4"
        />

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            {isSupported && (
              <MicButton
                isListening={isListening}
                onClick={startListening}
                disabled={isListening}
              />
            )}
            <span className="text-xs md:text-sm text-purple-600">
              {isSupported ? "Tap mic to dictate" : "Type your thoughts"}
            </span>
          </div>
          <Button
            onClick={handleSave}
            disabled={!content.trim()}
            size="icon"
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-full h-12 w-12 md:h-14 md:w-14 cursor-pointer shadow-lg"
          >
            <Save className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
        </div>
      </div>

      <Button
        onClick={() => setShowEntries(!showEntries)}
        variant="outline"
        className="w-full rounded-2xl border-2 border-purple-300 font-bold cursor-pointer"
      >
        <BookOpen className="h-5 w-5 mr-2" />
        {showEntries ? "Hide" : "View"} Past Entries ({entries.length})
      </Button>

      <AnimatePresence>
        {showEntries && entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-3 max-h-[400px] overflow-y-auto"
          >
            {entries.map((entry) => (
              <motion.div
                key={entry._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/70 rounded-2xl p-4 border-2 border-purple-200"
              >
                <p className="text-sm text-purple-600 mb-2">
                  {formatDate(entry._creationTime)}
                </p>
                <p className="text-gray-700">{entry.content}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}