import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createInsight, getDomainInsight, getDomainInsights } from "./client";

export const useCreateDomainInsight = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (domainName: string) => createInsight(domainName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useGetDomainInsight = (id: string) =>
  useQuery({
    queryKey: ["insights", id],
    queryFn: () => getDomainInsight(id),
  });

export const useGetDomainInsights = () =>
  useQuery({
    queryKey: ["insights"],
    queryFn: () => getDomainInsights(),
  });
