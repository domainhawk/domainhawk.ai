import { DialogActionTrigger, Text, VStack } from "@chakra-ui/react";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useGetWatchedDomains, useWatchDomain } from "@/api/domains";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { toaster } from "../ui/toaster";
import { Tooltip } from "../ui/tooltip";

export const SetupWatchDialog = ({
  uuid,
  domainName,
}: {
  uuid: string;
  domainName: string;
}) => {
  const [open, setOpen] = useState(false);
  const { data, isPending: watchedDomainsPending } = useGetWatchedDomains();

  const isWatched = data?.some(
    (domain: any) => domain.domain_search.id === uuid
  );

  const navigate = useNavigate();
  const { mutateAsync: watchDomain, isPending } = useWatchDomain();

  const viewAll = () => {
    setOpen(false);
    navigate("/watched");
  };

  const handleWatchDomain = async () => {
    await watchDomain(uuid);
    setOpen(false);
    toaster.create({
      title: "Watch created",
      description: (
        <VStack alignItems={"flex-start"} gap={1}>
          <Text>
            You're now watching <b>{domainName}</b> for expiration
          </Text>
          <Button variant="solid" size={"xs"} onClick={viewAll}>
            All watched domains
          </Button>
        </VStack>
      ),
      type: "success",
      duration: 1500,
    });
  };

  if (watchedDomainsPending) {
    return null;
  }

  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Tooltip
        content={"Already watching this domain"}
        disabled={!isWatched}
        openDelay={150}
      >
        <DialogTrigger asChild disabled={isWatched}>
          <Button>Watch this domain</Button>
        </DialogTrigger>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add {domainName} to your watchlist</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>This will add this domain to your list of watched domains.</p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button
            loading={isPending}
            loadingText="Setting up watch.."
            onClick={handleWatchDomain}
          >
            Save
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
