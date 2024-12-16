import { useWatchDomain } from "@/api/domains/hooks";
import { useAuthContext } from "@/components/auth/useAuthContext";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { useAxiosErrorHandler } from "@/hooks/useAxiosErrorHandler";
import { useNotify } from "@/hooks/useNotify";
import { LuPlus } from "react-icons/lu";

export const AddToWatchedDomainsButton = ({
  domainName,
  expiryDate,
}: {
  domainName: string;
  expiryDate?: string;
}) => {
  const { user } = useAuthContext();
  const handleError = useAxiosErrorHandler();
  const notify = useNotify();
  const expiringDomainsWatched =
    user?.user_settings?.expiring_domains_watched || 0;
  const canAddToWatchedDomains = Boolean(
    expiryDate && expiringDomainsWatched > 0
  );

  const { mutateAsync: watchDomain, isPending } = useWatchDomain();

  const handleAddToWatchedDomains = async () => {
    try {
      await watchDomain({ domainName, expiryDate: expiryDate! });
      notify(
        "Domain added to watched domains",
        "You will receive an email when the domain expires"
      );
    } catch (error) {
      handleError(error, { domainName });
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
        w={["full", "auto"]}
        loading={isPending}
        loadingText="Adding to watched domains"
        disabled={!canAddToWatchedDomains}
        onClick={handleAddToWatchedDomains}
        alignSelf="flex-start"
      >
        <LuPlus />
        Add {domainName} to my watched domains
      </Button>
    </Tooltip>
  );
};
