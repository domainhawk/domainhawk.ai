import { Container } from "@chakra-ui/react";
import { useGetWatchedDomains } from "@/api/domains/hooks";
import { WatchedTable } from "@/components/custom/tables/WatchedTable";

export default function Watched() {
  const { data, isPending, error } = useGetWatchedDomains();

  if (isPending) {
    return (
      <Container maxW="container.xl" py={[4, 6, 8]}>
        Loading...
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={[4, 6, 8]}>
        Error: {error.message}
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={[4, 6, 8]}>
      <WatchedTable domains={data} />
    </Container>
  );
}
