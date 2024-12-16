import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/date";
import { HStack, Table, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Insight {
  id: string;
  domain_name: string;
  created_at: string;
  schema_version: string;
}

interface TableRowProps {
  insight: Insight;
}

const TableRow = ({ insight }: TableRowProps) => {
  const navigate = useNavigate();

  return (
    <Table.Row>
      <Table.Cell width="25%">{insight.domain_name}</Table.Cell>
      <Table.Cell>{formatDate(insight.created_at)}</Table.Cell>
      <Table.Cell>{insight.schema_version}</Table.Cell>
      <Table.Cell>
        <HStack gap={2}>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate(`/account/insights/${insight.id}`)}
          >
            View
          </Button>
        </HStack>
      </Table.Cell>
    </Table.Row>
  );
};

export const InsightsTable = ({ insights }: { insights: Insight[] }) => {
  const hasNoInsights = insights.length === 0;

  return (
    <VStack gap={4} align="stretch">
      {hasNoInsights ? (
        <Text>No insights generated</Text>
      ) : (
        <Table.Root striped>
          <Table.Header>
            <Table.Row>
              <Table.Cell>Domain</Table.Cell>
              <Table.Cell>Generated</Table.Cell>
              <Table.Cell>Schema Version</Table.Cell>
              <Table.Cell>Actions</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {insights.map((insight) => (
              <TableRow key={insight.id} insight={insight} />
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </VStack>
  );
};
