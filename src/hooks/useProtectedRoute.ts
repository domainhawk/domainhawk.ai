import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export default function useProtectedRoute() {
  const [tokenSet, setTokenSet] = useState(false);
  const { isAuthenticated, isLoading, loginWithRedirect, getIdTokenClaims } =
    useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getIdTokenClaims().then((claims) => {
        if (!claims?.__raw) return;
        localStorage.setItem("token", claims?.__raw as string);
        setTokenSet(true);
      });
    }

    if (isLoading || isAuthenticated) {
      return;
    }

    loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.href,
      },
    });
  }, [isLoading, isAuthenticated, loginWithRedirect, getIdTokenClaims]);

  const loading = isLoading || !isAuthenticated;

  return {
    isAuthenticated,
    loading,
    tokenSet,
  };
}
