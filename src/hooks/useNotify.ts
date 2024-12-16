import { toaster } from "@/components/ui/toaster";

export const useNotify = () => {
  const notify = (
    title: string,
    description: string,
    type: "success" | "warning" | "error" = "success",
  ) => {
    toaster.create({ title, description, type, duration: 1500 });
  };
  return notify;
};
