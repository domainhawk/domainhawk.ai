import { useAuthContext } from "@/components/auth/useAuthContext";
import { Button } from "@/components/ui/button";
import {
  Box,
  Card,
  Link as ChakraLink,
  Container,
  Heading,
  List,
  Separator,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuCheck } from "react-icons/lu";

export default function Signup() {
  const { login } = useAuthContext();
  const usps = [
    "Detailed domain insights and analytics",
    "SEO and branding score analysis",
    "Market value estimation",
    "Alternative domain suggestions",
    "Renewal prediction intelligence",
  ];

  return (
    <Box position="relative" minH="100vh">
      {/* Blurred Background Skeleton */}
      <Box filter="blur(8px)" pointerEvents="none">
        <Container maxW="container.xl" py={8}>
          <Stack gap={6}>
            <Skeleton height="40px" variant={"shine"} />
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} height="300px" variant={"shine"} />
              ))}
            </SimpleGrid>
            <Skeleton
              display={["none", "block"]}
              height="150px"
              variant={"shine"}
            />
          </Stack>
        </Container>
      </Box>

      {/* Overlay Card */}
      <Box
        position="absolute"
        top={"20%"}
        left="50%"
        transform="translate(-50%, -20%)"
        width={{ base: "90%", md: "800px" }}
      >
        <Card.Root>
          <Card.Body>
            <Stack
              separator={<Separator w={"2px"} />}
              direction={{ base: "column", md: "row" }}
              width="full"
            >
              <VStack
                flex={{ base: "100%", md: "50%" }}
                p={8}
                alignItems={"flex-start"}
                gap={4}
              >
                <Heading size="lg">Domain Hawk</Heading>
                <Text fontSize="lg" color="gray.600">
                  Your AI-powered domain intelligence platform
                </Text>
                <List.Root gap={3} variant="plain">
                  {usps.map((usp, index) => (
                    <List.Item key={index}>
                      <List.Indicator asChild color="green.500">
                        <LuCheck />
                      </List.Indicator>
                      {usp}
                    </List.Item>
                  ))}
                </List.Root>
              </VStack>
              <VStack
                flex={{ base: "100%", md: "50%" }}
                p={8}
                alignItems={"stretch"}
                justifyContent={"space-between"}
              >
                <Box>
                  <Heading size="md" mb={4}>
                    Get Started Today with 3 free insights
                  </Heading>
                  <ChakraLink onClick={login}>
                    <Button colorScheme="blue" size="lg" width="100%" mb={2}>
                      Sign Up
                    </Button>
                  </ChakraLink>
                </Box>
                <ChakraLink onClick={login}>
                  Already a user? Login here
                </ChakraLink>
              </VStack>
            </Stack>
          </Card.Body>
        </Card.Root>
      </Box>
    </Box>
  );
}
