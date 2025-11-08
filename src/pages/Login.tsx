// This file is deprecated - all authentication now happens at /auth
// Keeping for backwards compatibility, redirects to /auth
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth");
  }, [navigate]);

  return null;
}