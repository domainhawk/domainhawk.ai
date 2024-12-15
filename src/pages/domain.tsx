import { useGetDomainDetails } from "@/api/domains/hooks";
import { AddToWatchedDomainsButton } from "@/components/custom/buttons/AddToWatchedDomains";
import { UnlockInsightsButton } from "@/components/custom/buttons/UnlockInsightsButton";
import {
  Box,
  Card,
  Container,
  Heading,
  List,
  Spinner,
  Table,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { LuCheck } from "react-icons/lu";
import { useParams } from "react-router-dom";

const DisplayRow = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;

  return (
    <Table.Row>
      <Table.Cell
        maxWidth="400px"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {label}
      </Table.Cell>
      <Table.Cell
        maxWidth="400px"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {value}
      </Table.Cell>
    </Table.Row>
  );
};

export const ListItemWithIcon = ({ children }: { children: ReactNode }) => {
  return (
    <List.Item>
      <List.Indicator asChild color="green.500">
        <LuCheck />
      </List.Indicator>
      {children}
    </List.Item>
  );
};

export default function Domain() {
  const { domainName } = useParams();
  const { data, isPending, error } = useGetDomainDetails(domainName!);

  if (isPending) {
    return (
      <Container centerContent py={10}>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error || data?.error) {
    return (
      <Container centerContent py={10}>
        <Text>{error?.message || data?.error}</Text>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container centerContent py={10}>
        <Text>No data found for {domainName}</Text>
      </Container>
    );
  }

  // return ;

  return (
    <Container maxW="container.xl" py={[4, 6, 10]}>
      <VStack gap={[4, 6, 8]} align="stretch" w="full">
        <HStack
          w="full"
          align="flex-start"
          gap={[4, 6, 8]}
          flexDir={["column", "column", "row"]}
        >
          {/* Left column - Domain Info */}
          <VStack gap={4} align="stretch" flex={2}>
            <AddToWatchedDomainsButton
              domainName={domainName!}
              expiryDate={data.expiryDate}
            />

            <Card.Root>
              <Card.Header>
                <Heading size="md">Domain Info</Heading>
              </Card.Header>
              <Card.Body>
                <Box
                  overflowX="auto"
                  maxWidth="100%"
                  sx={{
                    WebkitOverflowScrolling: "touch", // for smooth scrolling on iOS
                    "&::-webkit-scrollbar": {
                      height: "8px",
                    },
                  }}
                >
                  <Table.Root striped size="sm" style={{ minWidth: "100%" }}>
                    <Table.Body>
                      {data.result?.map((item, index) => (
                        <DisplayRow
                          key={`${index}-${item.attribute}`}
                          label={item.attribute}
                          value={item.value}
                        />
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Box>
              </Card.Body>
            </Card.Root>

            <AddToWatchedDomainsButton
              domainName={domainName!}
              expiryDate={data.expiryDate}
            />
          </VStack>

          {/* Right column - Domain Insights */}
          <Card.Root flex={1}>
            <Card.Header>
              <Heading size="md">Get Domain Insights</Heading>
            </Card.Header>
            <Card.Body>
              <VStack align="stretch" gap={4}>
                <Text fontSize="sm">
                  Get detailed insights about the domain, including:
                </Text>
                <List.Root fontSize="md" variant="plain" gap={2}>
                  <ListItemWithIcon>Domain age</ListItemWithIcon>
                  <ListItemWithIcon>SEO Value</ListItemWithIcon>
                  <ListItemWithIcon>Brand Strength</ListItemWithIcon>
                  <ListItemWithIcon>Likelihood to renew</ListItemWithIcon>
                  <ListItemWithIcon>Approx domain value</ListItemWithIcon>
                </List.Root>
                <Text fontSize="sm">... and more!</Text>
                <UnlockInsightsButton domainName={domainName!} />
              </VStack>
            </Card.Body>
          </Card.Root>
        </HStack>
      </VStack>
    </Container>
  );
}
