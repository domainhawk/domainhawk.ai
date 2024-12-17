import { WatchedDomain } from "@/api/domains/client";
import { useDeleteWatchedDomain } from "@/api/domains/hooks";
import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster";
import { CreateWatchRequestForm } from "@/pages/home";
import { formatDate } from "@/utils/date";
import { HStack, Table, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface TableRowProps {
  domain: WatchedDomain;
}

const TableRow = ({ domain }: TableRowProps) => {
  const navigate = useNavigate();
  const { mutateAsync: deleteWatchedDomain, isPending: isDeleting } =
    useDeleteWatchedDomain();

  const handleDelete = async (uuid: string) => {
    const toastId = toaster.create({
      title: "Deleting domain",
      description: "This may take a few seconds",
      type: "loading",
    });
    await deleteWatchedDomain(uuid);
    toaster.remove(toastId);
  };

  return (
    <Table.Row>
      <Table.Cell width="25%">{domain.domain_name}</Table.Cell>
      <Table.Cell>{formatDate(domain.expiry_date)}</Table.Cell>
      <Table.Cell>
        <HStack gap={2}>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate(`/account/watched/${domain.id}`)}
          >
            View
          </Button>
          <Button
            size="sm"
            variant="outline"
            loadingText="Deleting"
            disabled={isDeleting}
            onClick={() => handleDelete(domain.id)}
          >
            Delete
          </Button>
        </HStack>
      </Table.Cell>
    </Table.Row>
  );
};

export const WatchedTable = ({ domains }: { domains: WatchedDomain[] }) => {
  const hasNoDomains = domains.length === 0;

  return (
    <VStack gap={4} align="stretch" maxW="800px">
      <CreateWatchRequestForm
        background="gray.50"
        color="gray.500"
        _placeholder={{ color: "gray.500" }}
        maxW="450px"
      />
      {hasNoDomains ? (
        <Text>No domains watched</Text>
      ) : (
        <Table.Root striped>
          <Table.Header>
            <Table.Row>
              <Table.Cell>Domain</Table.Cell>
              <Table.Cell flex={1}>Expires</Table.Cell>
              <Table.Cell>Actions</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {domains.map((domain) => (
              <TableRow key={domain.id} domain={domain} />
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </VStack>
  );
};
