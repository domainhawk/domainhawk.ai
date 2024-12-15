import {
  domainCheck,
  getWatchedDomains,
  getDomainDetails,
  watchDomain,
  deleteWatchedDomain,
} from "./client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useDomainCheck = () =>
  useMutation({
    mutationFn: (domainName: string) => domainCheck(domainName),
  });

export const useGetDomainDetails = (uuid: string) =>
  useQuery({
    queryKey: ["domain-details", uuid],
    queryFn: () => getDomainDetails(uuid),
  });

export const useWatchDomain = () =>
  useMutation({
    mutationFn: (opts: { domainName: string; expiryDate: number }) =>
      watchDomain(opts.domainName, opts.expiryDate),
  });

export const useGetWatchedDomains = () =>
  useQuery({
    queryKey: ["watched-domains"],
    queryFn: () => getWatchedDomains(),
  });

export const useDeleteWatchedDomain = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (uuid: string) => deleteWatchedDomain(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watched-domains"] });
    },
  });
};
