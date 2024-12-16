import { useGetDomainDetails } from "@/api/domains/hooks";
import { useAuthContext } from "@/components/auth/useAuthContext";
import { AddToWatchedDomainsButton } from "@/components/custom/buttons/AddToWatchedDomains";
import { UnlockInsightsButton } from "@/components/custom/buttons/UnlockInsightsButton";
import { DomainDetailsTables } from "@/components/custom/domain/DomainDetailsTables";
import { Button } from "@/components/ui/button";
import { useLoginLogout } from "@/hooks/useLoginLogout";
import {
  Card,
  Container,
  Heading,
  HStack,
  List,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { LuCheck } from "react-icons/lu";
import { useParams } from "react-router-dom";

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
  const { login } = useLoginLogout();
  const { user } = useAuthContext();

  if (isPending) {
    return (
      <Container centerContent py={10}>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent py={10}>
        <Text>{error?.message}</Text>
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

  const domainDetails = data.data;

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
              expiryDate={domainDetails.expiry_date}
            />

            <DomainDetailsTables data={domainDetails} />

            <AddToWatchedDomainsButton
              domainName={domainName!}
              expiryDate={domainDetails.expiry_date}
            />
          </VStack>

          {/* Right column - Domain Insights */}
          <Card.Root flex={1} w="full">
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
                {user ? (
                  <UnlockInsightsButton domainName={domainName!} />
                ) : (
                  <Button onClick={login}>Login / Register</Button>
                )}
              </VStack>
            </Card.Body>
          </Card.Root>
        </HStack>
      </VStack>
    </Container>
  );
}
