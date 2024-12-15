import { useWatchDomain } from "@/api/domains/hooks";
import { useAuthContext } from "@/components/auth/useAuthContext";
import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster";
import { Tooltip } from "@/components/ui/tooltip";
import { LuPlus } from "react-icons/lu";

export const AddToWatchedDomainsButton = ({
  domainName,
  expiryDate,
}: {
  domainName: string;
  expiryDate?: number;
}) => {
  const { user } = useAuthContext();
  const expiringDomainsWatched =
    user?.user_settings?.expiring_domains_watched || 0;
  const canAddToWatchedDomains = Boolean(
    expiryDate && expiringDomainsWatched > 0
  );

  const { mutateAsync: watchDomain, isPending } = useWatchDomain();

  const handleAddToWatchedDomains = async () => {
    try {
      await watchDomain({ domainName, expiryDate: expiryDate! });
      toaster.create({
        title: "Domain added to watched domains",
        description: "You will receive an email when the domain expires",
        type: "success",
        duration: 1500,
      });
    } catch (error) {
      console.error(error);
    }
  };

  console.log({ expiringDomainsWatched, canAddToWatchedDomains });
  if (!user) return null;

  const tooltipContent = expiryDate
    ? "Add to my watched domains"
    : "Cannot watch this domain, no expiry date found";

  return (
    <Tooltip
      positioning={{ placement: "top" }}
      openDelay={100}
      content={tooltipContent}
      disabled={canAddToWatchedDomains}
    >
      <Button
        loading={isPending}
        loadingText="Adding to watched domains"
        disabled={!canAddToWatchedDomains}
        onClick={handleAddToWatchedDomains}
      >
        <LuPlus />
        Add {domainName} to my watched domains
      </Button>
    </Tooltip>
  );
};
