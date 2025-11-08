import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MeditationPlayer from "@/components/MeditationPlayer";
import JournalBox from "@/components/JournalBox";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function SelfCare() {
  const { isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const journalEntries = useQuery(api.journal.list);
  const createJournalEntry = useMutation(api.journal.create);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  const handleSaveJournal = async (content: string) => {
    try {
      await createJournalEntry({ content });
    } catch (error) {
      console.error("Failed to save journal entry:", error);
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200">
        <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black text-purple-700 mb-4">
            Self Care Corner 💜
          </h1>
          <p className="text-xl text-purple-600">
            Take care of your mind and heart!
          </p>
        </motion.div>

        <div className="space-y-8">
          <MeditationPlayer />
          <JournalBox entries={journalEntries || []} onSave={handleSaveJournal} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
