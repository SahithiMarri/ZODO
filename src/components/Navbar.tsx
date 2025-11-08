import { useAuth } from "@/hooks/use-auth";
import { Home, Sparkles, Heart, Lightbulb, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export default function Navbar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 border-b-4 border-white/30 shadow-lg"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-2 cursor-pointer">
            <div className="text-4xl font-black text-white drop-shadow-lg">
              ZODO
            </div>
            <span className="text-2xl">🎮</span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/home">
              <Button variant="ghost" className="text-white hover:bg-white/20 gap-2">
                <Home className="h-5 w-5" />
                Home
              </Button>
            </Link>
            <Link to="/zoo">
              <Button variant="ghost" className="text-white hover:bg-white/20 gap-2">
                <Sparkles className="h-5 w-5" />
                Virtual Zoo
              </Button>
            </Link>
            <Link to="/self-care">
              <Button variant="ghost" className="text-white hover:bg-white/20 gap-2">
                <Heart className="h-5 w-5" />
                Self Care
              </Button>
            </Link>
            <Link to="/suggestions">
              <Button variant="ghost" className="text-white hover:bg-white/20 gap-2">
                <Lightbulb className="h-5 w-5" />
                AI Tips
              </Button>
            </Link>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-white hover:bg-white/20 gap-2"
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </Button>
          </div>

          <div className="md:hidden">
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
