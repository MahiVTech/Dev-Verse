import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import toast from "react-hot-toast";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuthStore } from "../store/useAuthStore";
import { ROUTES } from "../constants/routes";

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const result = login({ email, password });
      setLoading(false);
      if (result.ok) {
        toast.success(result.message);
        navigate(ROUTES.dashboard);
      } else {
        setError(result.message);
      }
    }, 500);
  }

  function fillDemo() {
    setEmail("demo@devverse.io");
    setPassword("devverse123");
    toast("Demo credentials filled — create this account first via Register, or just try Sign in.", {
      icon: "💡",
      duration: 4000,
    });
  }

  return (
    <div>
      <h1 className="font-display text-xl font-semibold mb-1">Welcome back</h1>
      <p className="text-sm text-muted mb-6">
        Sign in to continue building in DevVerse.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          icon={<Mail className="w-4 h-4" />}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          icon={<Lock className="w-4 h-4" />}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-xs text-danger">{error}</p>}

        <Button
          type="submit"
          className="w-full"
          size="lg"
          icon={<LogIn className="w-4 h-4" />}
          loading={loading}
        >
          Sign in
        </Button>
      </form>

      <button
        onClick={fillDemo}
        className="w-full text-center text-xs text-cyan hover:underline mt-4"
      >
        Use demo credentials
      </button>

      <p className="text-center text-sm text-muted mt-6">
        Don't have an account?{" "}
        <Link to={ROUTES.register} className="text-cyan hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
