import { useAuthContext } from "@/components/auth/useAuthContext";
import { UpgradeButton } from "@/components/custom/buttons/UnlockInsightsButton";
import { Card, Heading, Table, Text, VStack } from "@chakra-ui/react";

const SubscriptionCard = () => {
  const { user } = useAuthContext();
  return (
    <>
      <Card.Root minW={"500px"}>
        <Card.Header>Subscription</Card.Header>
        <Card.Body>
          <Table.Root striped>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Subscription</Table.Cell>
                <Table.Cell>
                  {user?.user_settings?.subscription_type}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Insights Credits</Table.Cell>
                <Table.Cell>
                  {user?.user_settings?.premium_insights_api_calls}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Watched domains allowance</Table.Cell>
                <Table.Cell>
                  {user?.user_settings?.expiring_domains_watched}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Card.Body>
      </Card.Root>
      {user?.user_settings?.subscription_type === "free" && <UpgradeButton />}
    </>
  );
};

export default function AccountSettings() {
  return (
    <VStack alignItems={"flex-start"} gap={4} w={"full"} p={4}>
      <Heading>Account Settings</Heading>
      <Text>Manage your account settings and preferences here.</Text>
      <SubscriptionCard />
    </VStack>
  );
}
