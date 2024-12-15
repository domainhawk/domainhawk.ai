import { WatchedDomain } from "@/api/domains/client";
import {
  useDeleteWatchedDomain,
  useGetWatchedDomains,
} from "@/api/domains/hooks";
import { Button } from "@/components/ui/button";
import { CreateWatchRequestForm } from "@/pages/home";
import { formatDate } from "@/utils/date";
import { Group, Table, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// FIXME: type this
const TableRow = ({ domain }: { domain: WatchedDomain }) => {
  const navigate = useNavigate();
  const { mutateAsync: deleteWatchedDomain, isPending: isDeleting } =
    useDeleteWatchedDomain();

  const handleDelete = async (uuid: string) => {
    await deleteWatchedDomain(uuid);
  };

  return (
    <Table.Row>
      <Table.Cell>{domain.domain_name}</Table.Cell>
      <Table.Cell>{formatDate(domain.created_at)}</Table.Cell>
      <Table.Cell>{formatDate(domain.updated_at)}</Table.Cell>
      <Table.Cell>{formatDate(domain.expiry_date)}</Table.Cell>
      <Table.Cell>FIXME</Table.Cell>
      <Table.Cell>
        <Group attached>
          <Button
            size={"sm"}
            variant="outline"
            onClick={() => navigate(`/account/watched/${domain.id}`)}
          >
            View
          </Button>
          <Button
            size={"sm"}
            variant="outline"
            loadingText="Deleting"
            loading={isDeleting}
            onClick={() => handleDelete(domain.id)}
          >
            Delete
          </Button>
        </Group>
      </Table.Cell>
    </Table.Row>
  );
};

const WatchedTable = ({ domains }: { domains: WatchedDomain[] }) => {
  console.log({ domains });
  const hasNoDomains = domains.length === 0;

  return (
    <VStack gap={4} alignItems="flex-start">
      <CreateWatchRequestForm />
      {hasNoDomains ? (
        <Text>No domains watched</Text>
      ) : (
        <Table.Root striped maxW={"6xl"}>
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
              <TableRow domain={domain} />
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </VStack>
  );
};

export default function Watched() {
  const { data, isPending, error } = useGetWatchedDomains();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <WatchedTable domains={data} />;
}
