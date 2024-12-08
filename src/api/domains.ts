import { useMutation, useQuery } from "@tanstack/react-query";
import instance from ".";

export type DomainCheckResponse = {
  uuid: string;
};

export const domainCheck = async (
  domainName: string
): Promise<DomainCheckResponse> => {
  const res = await instance.get(`/domain-check/${domainName}`);
  return res.data;
};

export const useDomainCheck = () =>
  useMutation({
    mutationFn: (domainName: string) => domainCheck(domainName),
  });

const getDomainDetails = async (uuid: string) => {
  const res = await instance.get(`/domain-details/${uuid}`);
  return res.data;
};

export const useGetDomainDetails = (uuid: string) =>
  useQuery({
    queryKey: ["domain-details", uuid],
    queryFn: () => getDomainDetails(uuid),
  });
