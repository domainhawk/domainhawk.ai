import { isAxiosError } from "axios";
import { useNotify } from "./useNotify";

export const useAxiosErrorHandler = () => {
  const notify = useNotify();

  const handleError = (error: any, opts: any) => {
    if (
      isAxiosError(error) &&
      error.response?.data?.message === "DOMAIN_ALREADY_WATCHED"
    ) {
      notify(
        "You're already watching this domain",
        `${opts.domainName} is already in your list of watched domains`,
        "warning"
      );
    }
  };

  return handleError;
};
