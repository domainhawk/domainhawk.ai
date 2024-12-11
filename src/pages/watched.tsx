import { useGetWatchedDomains } from "@/api/domains";
import { DomainSearchData } from "@/types";
import { formatDate } from "@/utils/date";
import { Button, Group, Table } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const WatchedTable = ({ response }: { response: DomainSearchData }) => {
  console.log(response);
  const navigate = useNavigate();
  return (
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
                <Button size={"sm"} variant="outline">
                  Delete
                </Button>
              </Group>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
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
