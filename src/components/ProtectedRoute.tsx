import FullPageSpinner from "@/components/custom/FullPageSpinner";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "./auth/useAuthContext";

export default function ProtectedRoute() {
  const { isLoading, isAuthenticated } = useAuthContext();

  if (isLoading || !isAuthenticated) {
    return <FullPageSpinner />;
  }

  return <Outlet />;
}
