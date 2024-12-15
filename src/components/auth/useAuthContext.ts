import { useContext } from "react";
import { AuthContext } from "@/components/auth/AuthContext";

export const useAuthContext = () => useContext(AuthContext);