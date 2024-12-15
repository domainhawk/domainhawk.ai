import { useGetDomainDetails } from "@/api/domains/hooks";
import { AddToWatchedDomainsButton } from "@/components/custom/buttons/AddToWatchedDomains";
import { UnlockInsightsButton } from "@/components/custom/buttons/UnlockInsightsButton";
import {
  AbsoluteCenter,
  Card,
  Heading,
  HStack,
  List,
  Spinner,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { LuCheck } from "react-icons/lu";
import { useParams } from "react-router-dom";

const DisplayRow = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;

  return (
    <Table.Row>
      <Table.Cell flexGrow={1}>{label}</Table.Cell>
      <Table.Cell>{value}</Table.Cell>
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
      <AbsoluteCenter>
        <Spinner size={"xl"} />
      </AbsoluteCenter>
    );
  }

  if (error || data?.error) {
    return (
      <AbsoluteCenter>
        <Text>{error?.message || data?.error}</Text>
      </AbsoluteCenter>
    );
  }

  if (!data) {
    return (
      <AbsoluteCenter>
        <Text>No data found for {domainName}</Text>
      </AbsoluteCenter>
    );
  }

  // return ;

  return (
    <>
      {/* <CodeBlock p={10} w="full" h="800px">
        {JSON.stringify(data, null, 2)}
      </CodeBlock> */}

      <HStack
        w={"full"}
        justify={"center"}
        alignItems={"flex-start"}
        p={10}
        gap={10}
      >
        <VStack w={"full"} alignItems={"flex-start"} gap={12}>
          <AddToWatchedDomainsButton
            domainName={domainName!}
            expiryDate={data.expiryDate}
          />
          <Card.Root w={"full"} minW={"800px"} flex={1}>
            <Card.Header>Domain Info</Card.Header>
            <Card.Body>
              <Table.Root striped>
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
            </Card.Body>
          </Card.Root>
          <AddToWatchedDomainsButton
            domainName={domainName!}
            expiryDate={data.expiryDate}
          />
        </VStack>
        <VStack w={"full"} alignItems={"flex-start"} gap={12}>
          <VStack alignItems={"flex-start"} gap={2}>
            <Heading fontSize={"md"}>Get Domain Insights</Heading>
            <Text fontSize={"sm"}>
              Get detailed insights about the domain, including:
            </Text>
            <List.Root fontSize={"md"} variant={"plain"} gap={2}>
              <ListItemWithIcon>Domain age</ListItemWithIcon>
              <ListItemWithIcon>SEO Value</ListItemWithIcon>
              <ListItemWithIcon>Brand Strength</ListItemWithIcon>
              <ListItemWithIcon>Likelihood to renew</ListItemWithIcon>
              <ListItemWithIcon>Approx domain value</ListItemWithIcon>
            </List.Root>
            <Text fontSize={"sm"}>... and more!</Text>
          </VStack>
          <UnlockInsightsButton domainName={domainName!} />
        </VStack>
      </HStack>
    </>
  );
}
