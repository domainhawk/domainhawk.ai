import { Heading, HStack, VStack } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { Link, Outlet } from "react-router-dom";
import AccountMenu from "@/components/AccountMenu";
import { useColorModeValue } from "@/components/ui/color-mode";

const Header = () => {
  return (
    <HStack
      w="full"
      px={4}
      minH={"40px"}
      justifyContent={"space-between"}
      bgColor={useColorModeValue("gray.100", "gray.900")}
    >
      <Link to="/">
        <Heading size="md">DomainHawk.ai</Heading>
      </Link>

      <AccountMenu />
    </HStack>
  );
};

export const LayerContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack w="full">
      <Helmet>
        <title>DomainHawk.ai</title>
      </Helmet>
      <Header />
      {children}
    </VStack>
  );
};

export default function SiteLayout() {
  return (
    <LayerContainer>
      <Outlet />
    </LayerContainer>
  );
}
