import {
  AbsoluteCenter,
  Button,
  Group,
  Heading,
  HStack,
  List,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

import { Card } from "@chakra-ui/react";
import { ListItemWithIcon } from "./domain";

const PricingCards = () => {
  return (
    <Group as={HStack} gap={12} alignItems={"flex-start"}>
      <Card.Root w="280px">
        <Card.Header>
          <Card.Title>Free</Card.Title>
        </Card.Header>
        <Card.Body as={VStack} gap={4} alignItems={"flex-start"}>
          <Text fontSize={"sm"}>Monthly</Text>
          <List.Root variant={"plain"}>
            <ListItemWithIcon>3 domain insights</ListItemWithIcon>
            <ListItemWithIcon>3 watched domains</ListItemWithIcon>
          </List.Root>
        </Card.Body>
        <Card.Footer>
          <Button>Upgrade now</Button>
        </Card.Footer>
      </Card.Root>
      <Card.Root scale={1.3} w="280px">
        <Card.Header>
          <Card.Title>Pro</Card.Title>
        </Card.Header>
        <Card.Body as={VStack} gap={4} alignItems={"flex-start"}>
          <Text fontSize={"sm"}>Monthly</Text>
          <List.Root variant={"plain"}>
            <ListItemWithIcon>100 insights credits</ListItemWithIcon>
            <ListItemWithIcon>Unlimited watched domains</ListItemWithIcon>
          </List.Root>
        </Card.Body>
        <Card.Footer>
          <Button>Upgrade now</Button>
        </Card.Footer>
      </Card.Root>
      <Card.Root w="280px">
        <Card.Header>
          <Card.Title>Enterprise</Card.Title>
        </Card.Header>
        <Card.Body as={VStack} gap={4} alignItems={"flex-start"}>
          <Text>Contact us</Text>
        </Card.Body>
        <Card.Footer>
          <Button>Contact us</Button>
        </Card.Footer>
      </Card.Root>
    </Group>
  );
};

export default function Upgrade() {
  return (
    <VStack gap={8} as={AbsoluteCenter}>
      <Heading>Upgrade</Heading>
      <Text>Upgrade to unlock more domain insights and features.</Text>
      <Spacer h={"100px"} />
      <PricingCards />
    </VStack>
  );
}
