import { User } from "@/api/user/client";
import { LogoutOptions } from "@auth0/auth0-react";
import { createContext } from "react";

const defaultContextProps = {
  isAdmin: false,
  isAuthenticated: false,
  isLoading: false,
  logout: () => Promise.resolve(),
  login: () => Promise.resolve(),
  user: undefined,
  gates: [],
};

export const AuthContext = createContext<{
  isAdmin: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: (props: LogoutOptions | undefined) => Promise<void>;
  login: () => Promise<void>;
  user?: User;
  gates?: string[];
}>(defaultContextProps);
