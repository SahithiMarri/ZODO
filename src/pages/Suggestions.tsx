import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SuggestionCard from "@/components/SuggestionCard";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { suggestions } from "@/data/suggestions";

export default function Suggestions() {
  const { isLoading, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const personalizedSuggestions = useQuery(api.suggestions.getPersonalized);
  const generateAISuggestions = useAction(api.suggestions.generateAI);
  const [aiSuggestions, setAiSuggestions] = useState<Array<{ id: string; title: string; text: string; icon: string }>>([]);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  useEffect(() => {
    let isMounted = true;
    
    if (user && aiSuggestions.length === 0 && !loadingAI) {
      setLoadingAI(true);
      generateAISuggestions({ userId: user._id })
        .then((suggestions) => {
          if (isMounted && suggestions && suggestions.length > 0) {
            setAiSuggestions(suggestions);
          }
        })
        .catch((error) => {
          console.error("Error generating AI suggestions:", error);
        })
        .finally(() => {
          if (isMounted) {
            setLoadingAI(false);
          }
        });
    }
    
    return () => {
      isMounted = false;
    };
  }, [user]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200">
        <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
      </div>
    );
  }

  const hasPersonalized = personalizedSuggestions && personalizedSuggestions.length > 0;
  const hasAI = aiSuggestions.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-200 flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black text-purple-700 mb-4">
            AI Tips & Tricks 💡
          </h1>
          <p className="text-xl text-purple-600">
            Smart ideas to help you succeed!
          </p>
        </motion.div>

        {loadingAI && (
          <div className="mb-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-3 text-purple-600"
            >
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-lg font-semibold">AI is thinking of personalized tips for you...</span>
            </motion.div>
          </div>
        )}

        {hasAI && (
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-4"
            >
              <Sparkles className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl md:text-3xl font-black text-purple-700">
                AI Powered Just For You
              </h2>
            </motion.div>
            <div className="space-y-4">
              {aiSuggestions.map((suggestion, index) => (
                <SuggestionCard
                  key={suggestion.id}
                  suggestion={suggestion}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {hasPersonalized && (
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-4"
            >
              <h2 className="text-2xl md:text-3xl font-black text-purple-700">
                Based on Your Activity
              </h2>
            </motion.div>
            <div className="space-y-4">
              {personalizedSuggestions.map((suggestion, index) => (
                <SuggestionCard
                  key={suggestion.id}
                  suggestion={suggestion}
                  index={hasAI ? index + aiSuggestions.length : index}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-black text-purple-700 mb-4"
          >
            General Tips
          </motion.h2>
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <SuggestionCard
                key={suggestion.id}
                suggestion={suggestion}
                index={hasPersonalized ? index + personalizedSuggestions.length + aiSuggestions.length : index + aiSuggestions.length}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}