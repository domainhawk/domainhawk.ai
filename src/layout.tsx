import { Heading, HStack, VStack } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { Link, Outlet } from "react-router-dom";
import AccountMenu from "./components/AccountMenu";
import { ColorModeButton, useColorModeValue } from "./components/ui/color-mode";

const Header = () => {
  return (
    <HStack
      w="full"
      justifyContent={"flex-end"}
      bgColor={useColorModeValue("gray.100", "gray.900")}
    >
      <Link to="/">
        <Heading size="md">DomainHawk.ai</Heading>
      </Link>
      <AccountMenu />
      <ColorModeButton />
    </HStack>
  );
};

export default function Layout() {
  return (
    <VStack w="full">
      <Helmet>
        <title>DomainHawk.ai</title>
      </Helmet>
      <Header />
      <Outlet />
    </VStack>
  );
}
