import { useDeleteWatchedDomain, useGetWatchedDomains } from "@/api/domains";
import { Button } from "@/components/ui/button";
import { DomainSearchData, DomainSearchEntry } from "@/types";
import { formatDate } from "@/utils/date";
import { Group, Table, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CreateWatchRequestForm } from "@/pages/home";

const TableRow = ({ domain }: { domain: DomainSearchEntry }) => {
  const navigate = useNavigate();
  const { mutateAsync: deleteWatchedDomain, isPending: isDeleting } =
    useDeleteWatchedDomain();

  const handleDelete = async (uuid: string) => {
    await deleteWatchedDomain(uuid);
  };

  return (
    <Table.Row>
      <Table.Cell>{domain.domain_search.domain_name}</Table.Cell>
      <Table.Cell>{formatDate(domain.created_at)}</Table.Cell>
      <Table.Cell>{formatDate(domain.updated_at)}</Table.Cell>
      <Table.Cell>
        {formatDate(domain.domain_search.json_response.expires)}
      </Table.Cell>
      <Table.Cell>{domain.domain_search.json_response.status}</Table.Cell>
      <Table.Cell>
        <Group attached>
          <Button
            size={"sm"}
            variant="outline"
            onClick={() => navigate(`/domain/${domain.domain_search.id}`)}
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

const WatchedTable = ({ response }: { response: DomainSearchData }) => {
  const hasNoDomains = response.length === 0;

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
            {response.map((domain) => (
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

  return <WatchedTable response={data} />;
}
