import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigate("/home");
      } else {
        navigate("/auth");
      }
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300 flex items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
    </div>
  );
}