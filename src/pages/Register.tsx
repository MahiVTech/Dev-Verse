import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuthStore } from "../store/useAuthStore";
import { ROUTES } from "../constants/routes";

export default function Register() {
  const register = useAuthStore((s) => s.register);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = register({ name, email, password });
      setLoading(false);
      if (result.ok) {
        toast.success("Welcome to DevVerse!");
        navigate(ROUTES.dashboard);
      } else {
        setError(result.message);
      }
    }, 500);
  }

  return (
    <div>
      <h1 className="font-display text-xl font-semibold mb-1">Create your account</h1>
      <p className="text-sm text-muted mb-6">
        Everything is stored locally in your browser — no signup servers, no tracking.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full name"
          icon={<User className="w-4 h-4" />}
          placeholder="Ada Lovelace"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          placeholder="At least 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-xs text-danger">{error}</p>}

        <Button
          type="submit"
          className="w-full"
          size="lg"
          icon={<UserPlus className="w-4 h-4" />}
          loading={loading}
        >
          Create account
        </Button>
      </form>

      <p className="text-center text-sm text-muted mt-6">
        Already have an account?{" "}
        <Link to={ROUTES.login} className="text-cyan hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
