import { CodeBlock } from "@/components/custom/CodeBlock";
import { AbsoluteCenter } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetDomainDetails } from "../api/domains";

export default function Domain() {
  const { uuid } = useParams();
  const { data } = useGetDomainDetails(uuid!);

  return (
    <AbsoluteCenter px={4}>
      <CodeBlock>{JSON.stringify(data, null, 2)}</CodeBlock>
    </AbsoluteCenter>
  );
}
