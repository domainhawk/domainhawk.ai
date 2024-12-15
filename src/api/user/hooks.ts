import { useQuery } from "@tanstack/react-query";
import { getUser } from "./client";

export const useGetUser = (enabled: boolean = true) =>
    useQuery({
      queryKey: ["user"],
      queryFn: () => getUser(),
      enabled,
    });
  
  