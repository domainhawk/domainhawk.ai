import instance from "..";

export const getStripeCheckoutLink = async (): Promise<{ url: string }> => {
  const response = await instance.post(`/stripe/create-checkout-link`);
  return response.data;
};
