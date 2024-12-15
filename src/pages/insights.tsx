import { useGetDomainInsight } from "@/api/insights/hooks";
import { useParams } from "react-router-dom";
import { StatRoot } from "@/components/ui/stat";
import {
  Badge,
  Box,
  Card,
  Container,
  Heading,
  SimpleGrid,
  Skeleton,
  Stack,
  StatHelpText,
  StatLabel,
  StatValueText,
  Text,
} from "@chakra-ui/react";

export const Insights = () => {
  const { id, domainName } = useParams();
  const { data, isPending } = useGetDomainInsight(id!);

  if (isPending) {
    return (
      <Container maxW="container.xl" py={8}>
        <Stack gap={6}>
          <Skeleton height="40px" />
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} height="200px" />
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>No insights available for this domain.</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Stack gap={6}>
        <Box>
          <Heading size="lg" mb={2}>
            {data.domain_name}
          </Heading>
          <Text color="gray.600">Domain Insights and Analytics</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          <Card.Root>
            <Card.Header>
              <Heading size="md">Domain Details</Heading>
            </Card.Header>
            <Card.Body>
              <Stack gap={4}>
                <StatRoot>
                  <StatLabel>Created At</StatLabel>
                  <StatValueText>
                    {new Date(data.created_at).toLocaleDateString()}
                  </StatValueText>
                </StatRoot>
                <Box>
                  <Text fontWeight="bold" mb={2}>
                    Likely to Renew
                  </Text>
                  <Badge
                    colorScheme={data.content.likely_to_renew ? "green" : "red"}
                  >
                    {data.content.likely_to_renew ? "Yes" : "No"}
                  </Badge>
                  <Text fontSize="sm" mt={2} color="gray.600">
                    {data.content.rationale_for_likely_to_renew}
                  </Text>
                </Box>
              </Stack>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Header>
              <Heading size="md">Metrics</Heading>
            </Card.Header>
            <Card.Body>
              <Stack gap={4}>
                <StatRoot>
                  <StatLabel>SEO Score</StatLabel>
                  <StatValueText>{data.content.seo.score}</StatValueText>
                  <StatHelpText>{data.content.seo.explanation}</StatHelpText>
                </StatRoot>
                <StatRoot>
                  <StatLabel>Branding Score</StatLabel>
                  <StatValueText>{data.content.branding.score}</StatValueText>
                  <StatHelpText>
                    {data.content.branding.explanation}
                  </StatHelpText>
                </StatRoot>
                <StatRoot>
                  <StatLabel>Sentiment Score</StatLabel>
                  <StatValueText>{data.content.sentiment.score}</StatValueText>
                  <StatHelpText>
                    {data.content.sentiment.explanation}
                  </StatHelpText>
                </StatRoot>
              </Stack>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Header>
              <Heading size="md">Market Details</Heading>
            </Card.Header>
            <Card.Body>
              <Stack gap={4}>
                <StatRoot>
                  <StatLabel>Approximate Cost</StatLabel>
                  <StatValueText>
                    ${data.content.approximate_cost.toLocaleString()}
                  </StatValueText>
                  <StatHelpText>
                    {data.content.rationale_for_approximate_cost}
                  </StatHelpText>
                </StatRoot>
                <Box>
                  <Text fontWeight="bold" mb={2}>
                    Sector
                  </Text>
                  <Badge>{data.content.sector}</Badge>
                </Box>
                <Box>
                  <Text fontWeight="bold" mb={2}>
                    Keywords
                  </Text>
                  <Stack direction="row" flexWrap="wrap" gap={2}>
                    {data.content.keywords.map((keyword, index) => (
                      <Badge key={index} colorScheme="blue">
                        {keyword}
                      </Badge>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {data.content.alternative_domain_names.length > 0 && (
          <Card.Root>
            <Card.Header>
              <Heading size="md">Alternative Domain Names</Heading>
            </Card.Header>
            <Card.Body>
              <Stack direction="row" flexWrap="wrap" gap={2}>
                {data.content.alternative_domain_names.map((domain, index) => (
                  <Badge key={index} colorScheme="purple">
                    {domain}
                  </Badge>
                ))}
              </Stack>
            </Card.Body>
          </Card.Root>
        )}
      </Stack>
    </Container>
  );
};
