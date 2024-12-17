import { useMutation } from '@tanstack/react-query';
import { getStripeCheckoutLink } from './client';

export const useStripeCheckoutLink = () => {
  return useMutation({
    mutationFn: () => getStripeCheckoutLink(),
  });
};
