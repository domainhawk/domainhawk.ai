import FullPageSpinner from "@/components/custom/FullPageSpinner";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "./auth/useAuthContext";
import Signup from "@/pages/signup";

export default function ProtectedRoute() {
  const { isLoading, isAuthenticated } = useAuthContext();

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (!isAuthenticated) {
    return <Signup />;
  }

  return <Outlet />;
}
