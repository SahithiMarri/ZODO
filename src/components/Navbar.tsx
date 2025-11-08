import { useAuth } from "@/hooks/use-auth";
import { Home, Sparkles, Heart, Lightbulb, LogOut, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export default function Navbar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
    setOpen(false);
  };

  const navItems = [
    { to: "/home", icon: Home, label: "Home" },
    { to: "/zoo", icon: Sparkles, label: "Virtual Zoo" },
    { to: "/self-care", icon: Heart, label: "Self Care" },
    { to: "/suggestions", icon: Lightbulb, label: "AI Tips" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 border-b-4 border-white/30 shadow-lg"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-2 cursor-pointer">
            <div className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">
              ZODO
            </div>
            <span className="text-xl md:text-2xl">🎮</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to}>
                <Button variant="ghost" className="text-white hover:bg-white/20 gap-2">
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            ))}
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-white hover:bg-white/20 gap-2"
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 bg-gradient-to-b from-purple-100 to-pink-100">
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start gap-3 text-purple-700 hover:bg-purple-200">
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start gap-3 text-red-600 hover:bg-red-100"
                  >
                    <LogOut className="h-5 w-5" />
                    Log Out
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}