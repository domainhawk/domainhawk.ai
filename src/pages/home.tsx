import { useDomainCheck } from "@/api/domains/hooks";
import { Field as FormField } from "@/components/ui/field";
import { useIsMobile } from "@/hooks/useIsMobile";
import { isValidDomainName } from "@/utils/validators";
import {
  AbsoluteCenter,
  Button,
  Group,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Form, useField } from "react-final-form";
import { useNavigate } from "react-router-dom";

const InputContainer = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <VStack w="full" gap={2} alignItems={"stretch"}>
        {children}
      </VStack>
    );
  }
  return (
    <Group attached w="full">
      {children}
    </Group>
  );
};

const InputControl = ({
  name,
  label,
  isLoading,
  buttonText,
  placeholder,
  error,
}: {
  name: string;
  label: string;
  isLoading: boolean;
  buttonText: string;
  placeholder?: string;
  error?: any;
}) => {
  const { input, meta } = useField(name, {
    validate: (value) =>
      (!value && "Required") ||
      (!isValidDomainName(value) && "Invalid domain name"),
  });

  return (
    <FormField label={label} invalid={meta.error && meta.touched} w="full">
      <InputContainer>
        <Input {...input} id={name} placeholder={placeholder || label} />
        <Button
          type="submit"
          disabled={isLoading || meta.error}
          w={["full", "auto"]}
        >
          {buttonText}
          {isLoading && <Spinner size="xs" ml={2} />}
        </Button>
      </InputContainer>
      {meta.error && meta.touched && (
        <Text color="red" fontSize="xs">
          {meta.error}
        </Text>
      )}
      {error && (
        <Text color="red" fontSize="xs">
          {error.message}
        </Text>
      )}
    </FormField>
  );
};

export const CreateWatchRequestForm = () => {
  const { mutateAsync: domainCheck, isPending, error } = useDomainCheck();
  const navigate = useNavigate();
  const onSubmit = async (values: any) => {
    const { domainName } = values;
    await domainCheck(domainName);
    navigate(`/domain/${domainName}`);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <VStack minW={["90%", "450px"]} gap={4}>
            <InputControl
              error={error}
              isLoading={isPending}
              name="domainName"
              label="Watch a domain name"
              placeholder="example.com"
              buttonText={isPending ? "Checking..." : "Check domain"}
            />
          </VStack>
        </form>
      )}
    />
  );
};

function Home() {
  return (
    <AbsoluteCenter>
      <CreateWatchRequestForm />
    </AbsoluteCenter>
  );
}

export default Home;
