import { useDomainCheck } from "@/api/domains/hooks";
import { useAuthContext } from "@/components/auth/useAuthContext";
import { Field as FormField } from "@/components/ui/field";
import { useIsMobile } from "@/hooks/useIsMobile";
import { isValidDomainName } from "@/utils/validators";
import {
  AbsoluteCenter,
  Button,
  Group,
  Input,
  InputProps,
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
  ...rest
}: {
  name: string;
  label: string;
  isLoading: boolean;
  buttonText: string;
  placeholder?: string;
  error?: any;
  [key: string]: any;
}) => {
  const { input, meta } = useField(name, {
    validate: (value) =>
      (!value && "Required") ||
      (!isValidDomainName(value) && "Invalid domain name"),
  });

  return (
    <FormField label={label} invalid={meta.error && meta.touched} w="full">
      <InputContainer>
        <Input
          {...input}
          id={name}
          placeholder={placeholder || label}
          {...rest}
        />
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

export const CreateWatchRequestForm = ({ ...rest }: InputProps) => {
  const { mutateAsync: domainCheck, isPending, error } = useDomainCheck();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const onSubmit = async (values: any) => {
    if (!user) {
      navigate("/signup");
      return;
    }

    const { domainName: domainNameFromCheck } = await domainCheck(
      values.domainName
    );
    navigate(`/domain/${domainNameFromCheck}`);
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
              {...rest}
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
