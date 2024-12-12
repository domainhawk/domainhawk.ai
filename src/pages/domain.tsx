import DomainInfo from "@/components/domain/DomainInfo";
import { SetupWatchDialog } from "@/components/domain/SetupWatchDialog";
import { AbsoluteCenter, Spinner, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetDomainDetails } from "@/api/domains";

export default function Domain() {
  const { uuid } = useParams();
  const { data, isPending, error } = useGetDomainDetails(uuid!);

  console.log({ data });

  if (isPending) {
    return (
      <AbsoluteCenter>
        <Spinner size={"xl"} />
      </AbsoluteCenter>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <AbsoluteCenter px={4}>
      <VStack w="full" pt={10} gap={10} minW={["300px", "800px"]}>
        <DomainInfo whois={data} />
        <SetupWatchDialog
          uuid={uuid!}
          domainName={data.domain_name}
          expiryDate={data.json_response.expires}
        />
      </VStack>
    </AbsoluteCenter>
  );
}
