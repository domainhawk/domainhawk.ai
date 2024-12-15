import instance from "..";

type UserSettings = {
  premium_insights_api_calls: number;
  expiring_domains_watched: number;
  subscription_type: string;
};

export type User = {
  user_settings: UserSettings;
};

export const getUser = async () => {
  const res = await instance.get('/user');
  return res.data as User;
};



