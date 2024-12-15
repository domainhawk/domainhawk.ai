import { User } from "@/api/user/client";
import { useGetUser } from "@/api/user/hooks";
import { AuthContext } from "@/components/auth/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode, useEffect, useState } from "react";

const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [hasAccessToken, setHasAccessToken] = useState(false);

  const {
    isAuthenticated,
    isLoading: auth0Loading,
    getIdTokenClaims,
    user: auth0User,
    logout: _logout,
    loginWithRedirect: _login,
  } = useAuth0();

  const isEnabled = isAuthenticated && hasAccessToken;
  const { data: userData } = useGetUser(isEnabled);
  const logout = () => _logout().then(() => localStorage.clear());
  const login = () => _login();

  useEffect(() => {
    if (!auth0Loading && isAuthenticated) {
      getIdTokenClaims()
        .then((token) => {
          localStorage.setItem("token", token?.__raw as string);
          setHasAccessToken(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [auth0Loading, isAuthenticated, getIdTokenClaims, auth0User?.sub]);

  const isLoading = loading || auth0Loading;
  const combinedUser = { ...userData, ...auth0User } as User;
  const user =
    Object.values(combinedUser).length > 0 ? combinedUser : undefined;

  return [user as User, isLoading, logout, login, isAuthenticated] as const;
};

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, isLoading, logout, login, isAuthenticated] = useUser();
  const isAdmin = false;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        isLoading,
        logout,
        login,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
