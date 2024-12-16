import { DomainDetails } from "@/types";
import instance from "..";
import { AxiosResponse } from "axios";

export type DomainCheckResponse = {
  uuid: string;
};

export type WatchedDomain = {
  id: string;
  domain_name: string;
  expiry_date: string;
  created_at: string;
  updated_at: string;
};

export const domainCheck = async (
  domainName: string
): Promise<DomainCheckResponse> => {
  const res = await instance.post(`/domain/check`, {
    domainName,
  });
  return res.data;
};

export const watchDomain = async (
  domainName: string,
  expiryDate: string
): Promise<WatchedDomain> => {
  const res = await instance.post(`/domain/watch`, {
    domainName,
    expiryDate,
  });
  return res.data;
};

export const deleteWatchedDomain = async (uuid: string) => {
  const res = await instance.delete(`/domain/watched/${uuid}`);
  return res.data;
};

export const getWatchedDomains = async (): Promise<WatchedDomain[]> => {
  const res = await instance.get(`/domain/watched`);
  return res.data;
};

export const getDomainDetails = async (
  uuid: string
): Promise<AxiosResponse<DomainDetails>> => {
  return instance.get(`/domain/details/${uuid}`);
};
