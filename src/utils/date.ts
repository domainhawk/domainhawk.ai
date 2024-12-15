import { format } from "date-fns";

export const formatDate = (date?: string) => {
  if (!date) return "Not available";
  return format(new Date(date), "Pp");
};
