import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && isLoading) {
      navigate("/home");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Account created! Welcome to ZODO! 🎉");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border-4 border-white/50 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🌟</div>
          <h1 className="text-4xl font-black text-purple-700 mb-2">Join ZODO</h1>
          <p className="text-purple-600">Start your adventure!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="h-14 text-lg rounded-2xl border-2 border-purple-300 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="h-14 text-lg rounded-2xl border-2 border-purple-300 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="h-14 text-lg rounded-2xl border-2 border-purple-300 focus:border-purple-500"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-14 text-xl font-bold rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 shadow-lg cursor-pointer"
          >
            Sign Up 🚀
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-purple-700">
            Already have an account?{" "}
            <Link to="/login" className="font-bold underline cursor-pointer">
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
