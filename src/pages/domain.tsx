import { CodeBlock } from "@/components/custom/CodeBlock";
import { AbsoluteCenter, Button, Group, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetDomainDetails } from "../api/domains";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SetupWatchDialog = () => {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button>Watch this domain</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add this domain to your watchlist</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            This is not implemented yet, but if logged in, this will add this
            domain to your list of watched domains.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button>Save</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default function Domain() {
  const { uuid } = useParams();
  const { data } = useGetDomainDetails(uuid!);

  return (
    <AbsoluteCenter px={4}>
      <VStack w="full" gap={10}>
        <CodeBlock>{JSON.stringify(data, null, 2)}</CodeBlock>
        <SetupWatchDialog />
      </VStack>
    </AbsoluteCenter>
  );
}
