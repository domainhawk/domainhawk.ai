import { LayerContainer } from "@/layout";
import { AbsoluteCenter, Heading, HStack, VStack } from "@chakra-ui/react";
import { FiAlertCircle } from "react-icons/fi";
import { Link, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.log({ error });

  return (
    <LayerContainer>
      <AbsoluteCenter>
        <VStack gap={4}>
          <Heading fontSize={"4xl"} w="full" textAlign={"center"}>
            <HStack w="full" justifyContent={"center"}>
              <FiAlertCircle /> {error.status}
            </HStack>
          </Heading>
          <Heading fontSize={"2xl"} w="full" textAlign={"center"}>
            {error.data}
          </Heading>
          <Link to="/">Go to home</Link>
        </VStack>
      </AbsoluteCenter>
    </LayerContainer>
  );
}
