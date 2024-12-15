import instance from "..";
// Define the types for nested objects
type Seo = {
  score: number;
  explanation: string;
};

type Branding = {
  score: number;
  explanation: string;
};

type Sentiment = {
  score: number;
  explanation: string;
};

type Content = {
  likely_to_renew: boolean;
  rationale_for_likely_to_renew: string;
  approximate_cost: number;
  rationale_for_approximate_cost: string;
  sector: string;
  seo: Seo;
  branding: Branding;
  sentiment: Sentiment;
  keywords: string[];
  alternative_domain_names: string[];
};

// Define the main InsightResponse type
export type InsightResponse = {
  id: string;
  domain_name: string;
  schema_version: string;
  content: Content;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
};

export const createInsight = async (
  domainName: string
): Promise<{ id: string }> => {
  const res = await instance.post(`/insights/create`, {
    domainName,
  });
  return res.data;
};

export const getDomainInsight = async (id: string): Promise<InsightResponse> => {
  const res = await instance.get(`/insights/${id}`);
  return res.data;
};

