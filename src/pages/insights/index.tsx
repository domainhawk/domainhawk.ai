import { useGetDomainInsights } from "@/api/insights/hooks";
import FullPageSpinner from "@/components/custom/FullPageSpinner";
import { InsightsTable } from "@/components/insights/InsightsTable";
import { Text, VStack } from "@chakra-ui/react";

export const Insights = () => {
  const { data, isPending, error } = useGetDomainInsights();

  if (isPending) {
    return <FullPageSpinner />;
  }

  if (error) {
    return <Text color="red.500">Failed to load insights</Text>;
  }

  return (
    <VStack gap={4} align="stretch" p={4}>
      <Text fontSize="2xl" fontWeight="bold">
        Domain Insights
      </Text>
      <InsightsTable insights={data} />
    </VStack>
  );
};
