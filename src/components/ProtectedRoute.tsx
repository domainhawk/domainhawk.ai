import { Outlet } from "react-router-dom";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import FullPageSpinner from "@/components/custom/FullPageSpinner";

export default function ProtectedRoute() {
  const { loading, isAuthenticated } = useProtectedRoute();

  // Authentication is taken care of by the useProtectedRoute hook
  if (loading || !isAuthenticated) {
    return <FullPageSpinner />;
  }

  return <Outlet />;
}
