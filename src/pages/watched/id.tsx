import {
  useDeleteWatchedDomain,
  useGetWatchedDomain,
} from "@/api/domains/hooks";
import FullPageSpinner from "@/components/custom/FullPageSpinner";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNotify } from "@/hooks/useNotify";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";

export default function WatchedById() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isPending } = useGetWatchedDomain(id!);
  const deleteDomain = useDeleteWatchedDomain();
  const notify = useNotify();

  const handleDelete = async () => {
    try {
      await deleteDomain.mutateAsync(id!);
      notify(
        "Domain removed",
        "Successfully removed domain from watch list",
        "success"
      );
      navigate("/account/watched");
    } catch (error: any) {
      notify("Error", "Failed to remove domain from watch list", "error");
    }
  };

  if (isPending) {
    return <FullPageSpinner />;
  }

  if (!data) {
    return (
      <Box p={4}>
        <Text>Domain not found</Text>
      </Box>
    );
  }

  const watchedDomain = data.data;
  return (
    <Box maxW="container.md" mx="auto" p={6}>
      <Card.Root>
        <CardHeader>
          <Heading size="lg">{watchedDomain.domain_name}</Heading>
        </CardHeader>

        <CardBody>
          <Stack gap={4}>
            <Box>
              <Text color="gray.500" fontSize="sm">
                Created At
              </Text>
              <Text fontWeight="medium">
                {format(new Date(watchedDomain.created_at), "PPP")}
              </Text>
            </Box>

            <Box>
              <Text color="gray.500" fontSize="sm">
                Last Updated
              </Text>
              <Text fontWeight="medium">
                {format(new Date(watchedDomain.updated_at), "PPP")}
              </Text>
            </Box>

            <Box>
              <Text color="gray.500" fontSize="sm">
                Expiry Date
              </Text>
              <Text fontWeight="medium">
                {format(new Date(watchedDomain.expiry_date), "PPP")}
              </Text>
            </Box>
          </Stack>
        </CardBody>

        <Card.Footer>
          <DialogRoot role="alertdialog">
            <DialogTrigger asChild>
              <Button colorScheme="red">Remove from Watch List</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <p>
                  This action cannot be undone. This will permanently remove the
                  watched domain from your list.
                </p>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogActionTrigger>
                <Button colorPalette="red" onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
}
