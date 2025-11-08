import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Play, Pause, Volume2 } from "lucide-react";
import { Slider } from "./ui/slider";
import { motion } from "framer-motion";

type Level = "beginner" | "intermediate" | "advanced";

// Free meditation music URLs (royalty-free)
const MEDITATION_AUDIO = {
  beginner: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  intermediate: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  advanced: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
};

export default function MeditationPlayer() {
  const [level, setLevel] = useState<Level>("beginner");
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(300);
  const [volume, setVolume] = useState(50);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    // Initialize audio element
    if (!audioRef.current) {
      audioRef.current = new Audio(MEDITATION_AUDIO[level]);
      audioRef.current.loop = true;
    }
    
    // Update audio source when level changes
    audioRef.current.src = MEDITATION_AUDIO[level];
    audioRef.current.volume = volume / 100;
    
    // If playing, restart with new audio
    if (isPlaying) {
      audioRef.current.play().catch(console.error);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [level]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      // Start audio
      if (audioRef.current) {
        audioRef.current.play().catch(console.error);
      }
      
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
            return duration * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      // Pause audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, timeLeft, duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getLevelDescription = () => {
    switch (level) {
      case "beginner":
        return "Voice guidance + calming music 🎵";
      case "intermediate":
        return "Less guidance + music 🎶";
      case "advanced":
        return "Music only 🎼";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 border-4 border-white/50 shadow-xl"
    >
      <div className="text-center mb-6">
        <h3 className="text-3xl font-black text-purple-700 mb-2">
          Guided Meditation 🧘
        </h3>
        <p className="text-purple-600">{getLevelDescription()}</p>
      </div>

      <div className="flex justify-center gap-3 mb-8">
        {(["beginner", "intermediate", "advanced"] as Level[]).map((l) => (
          <Button
            key={l}
            onClick={() => setLevel(l)}
            variant={level === l ? "default" : "outline"}
            className={`rounded-2xl font-bold capitalize cursor-pointer ${
              level === l
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "border-2 border-purple-300"
            }`}
          >
            {l}
          </Button>
        ))}
      </div>

      <div className="bg-white/50 rounded-3xl p-8 mb-6">
        <div className="text-center mb-6">
          <div className="text-6xl font-black text-purple-700 mb-2">
            {formatTime(timeLeft)}
          </div>
          <div className="flex justify-center gap-2 mb-4">
            {[3, 5, 10].map((min) => (
              <Button
                key={min}
                onClick={() => setDuration(min)}
                variant={duration === min ? "default" : "outline"}
                size="sm"
                className={`rounded-xl cursor-pointer ${
                  duration === min ? "bg-purple-500" : ""
                }`}
              >
                {min} min
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <Button
            onClick={togglePlay}
            size="lg"
            className="rounded-full w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-xl cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="h-10 w-10 text-white" />
            ) : (
              <Play className="h-10 w-10 text-white ml-1" />
            )}
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Volume2 className="h-5 w-5 text-purple-600" />
          <Slider
            value={[volume]}
            onValueChange={(v) => setVolume(v[0])}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-purple-600 w-12">{volume}%</span>
        </div>
      </div>

      <p className="text-center text-sm text-purple-600">
        🌟 Find a quiet spot and relax! 🎵
      </p>
    </motion.div>
  );
}