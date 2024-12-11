import { DialogActionTrigger } from "@chakra-ui/react";

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

import { useWatchDomain } from "@/api/domains";
import { Button } from "../ui/button";
import { useState } from "react";
import { toaster } from "../ui/toaster";

export const SetupWatchDialog = ({
  uuid,
  domainName,
}: {
  uuid: string;
  domainName: string;
}) => {
  const [open, setOpen] = useState(false);

  console.log({ uuid, domainName });
  const { mutateAsync: watchDomain, isPending } = useWatchDomain();

  const handleWatchDomain = async () => {
    await watchDomain(uuid);
    toaster.create({
      title: "Watch created",
      description: `You're now watching ${domainName} for expiration`,
      type: "success",
    });
    setOpen(false);
  };

  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Button>Watch this domain</Button>
      </DialogTrigger>
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
