import { DialogActionTrigger, Group, Text, VStack } from "@chakra-ui/react";

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
import { useCallback, useState } from "react";
import { PiLockKeyOpenDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { toaster } from "../ui/toaster";
import { Tooltip } from "../ui/tooltip";

export const SetupWatchDialog = ({
  uuid,
  domainName,
  expiryDate,
}: {
  uuid: string;
  domainName: string;
  expiryDate: string;
}) => {
  console.log({ expiryDate }, !!expiryDate);
  const [open, setOpen] = useState(false);
  const { data, isPending: watchedDomainsPending } = useGetWatchedDomains();

  const isWatched = data?.some(
    (domain: any) => domain.domain_search.id === uuid
  );

  const getButton = useCallback(() => {
    const buttonDisabled = isWatched || !expiryDate;

    if (buttonDisabled) {
      return (
        <Tooltip
          content={
            isWatched
              ? "This domain is already being watched"
              : "Cannot watch this domain (no expiry date)"
          }
          openDelay={150}
          placement="top"
        >
          <Button size={"sm"} disabled>
            Watch this domain
          </Button>
        </Tooltip>
      );
    }

    return (
      <DialogTrigger asChild>
        <Button size={"sm"}>Watch this domain</Button>
      </DialogTrigger>
    );
  }, [isWatched, expiryDate]);

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
      <Group alignItems={"center"}>
        {getButton()}
        <Button variant={"solid"} size={"sm"} disabled>
          <PiLockKeyOpenDuotone />
          Get domain insights
        </Button>
      </Group>

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
