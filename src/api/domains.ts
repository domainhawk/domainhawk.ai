import { useMutation, useQuery } from "@tanstack/react-query";
import instance from ".";

export type DomainCheckResponse = {
  uuid: string;
};

export const domainCheck = async (
  domainName: string
): Promise<DomainCheckResponse> => {
  const res = await instance.post(`/domain/check`, {
    domainName,
  });
  return res.data;
};

const watchDomain = async (uuid: string) => {
  const res = await instance.put(`/domain/watch/${uuid}`);
  return res.data;
};

export const getWatchedDomains = async () => {
  const res = await instance.get(`/domain/watched`);
  return res.data;
};

export const useDomainCheck = () =>
  useMutation({
    mutationFn: (domainName: string) => domainCheck(domainName),
  });

const getDomainDetails = async (uuid: string) => {
  const res = await instance.get(`/domain/details/${uuid}`);
  return res.data;
};

export const useGetDomainDetails = (uuid: string) =>
  useQuery({
    queryKey: ["domain-details", uuid],
    queryFn: () => getDomainDetails(uuid),
  });

export const useWatchDomain = () =>
  useMutation({
    mutationFn: (uuid: string) => watchDomain(uuid),
  });

export const useGetWatchedDomains = () =>
  useQuery({
    queryKey: ["watched-domains"],
    queryFn: () => getWatchedDomains(),
  });
