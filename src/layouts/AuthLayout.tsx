import { Outlet, Navigate } from "react-router-dom";
import AmbientBackground from "../components/common/AmbientBackground";
import Logo from "../components/common/Logo";
import { useAuthStore } from "../store/useAuthStore";
import { ROUTES } from "../constants/routes";

export default function AuthLayout() {
  const user = useAuthStore((s) => s.user);

  if (user) {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <AmbientBackground />
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>
        <div className="glass-strong rounded-2xl p-7 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
