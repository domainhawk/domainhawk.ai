import { WatchedDomain } from "@/api/domains/client";
import { useDeleteWatchedDomain } from "@/api/domains/hooks";
import { Button } from "@/components/ui/button";
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
    await deleteWatchedDomain(uuid);
  };

  return (
    <Table.Row>
      <Table.Cell width="25%">{domain.domain_name}</Table.Cell>
      <Table.Cell>{formatDate(domain.created_at)}</Table.Cell>
      <Table.Cell>{formatDate(domain.updated_at)}</Table.Cell>
      <Table.Cell>{formatDate(domain.expiry_date)}</Table.Cell>
      <Table.Cell>Active</Table.Cell>
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
            loading={isDeleting}
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
    <VStack gap={4} align="stretch">
      <CreateWatchRequestForm />
      {hasNoDomains ? (
        <Text>No domains watched</Text>
      ) : (
        <Table.Root striped>
          <Table.Header>
            <Table.Row>
              <Table.Cell>Domain</Table.Cell>
              <Table.Cell>Created</Table.Cell>
              <Table.Cell>Changed</Table.Cell>
              <Table.Cell>Expires</Table.Cell>
              <Table.Cell>Status</Table.Cell>
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
