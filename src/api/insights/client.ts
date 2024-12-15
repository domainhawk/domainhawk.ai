import instance from "..";

export const createInsight = async (domainName: string) => {
  const res = await instance.post(`/insights/create`, {
    domainName,
  });
  return res.data;
};

export const getDomainInsight = async (id: string) => {
  const res = await instance.get(`/insights/${id}`);
  return res.data;
};

