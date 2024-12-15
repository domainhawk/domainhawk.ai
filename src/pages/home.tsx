import { Field as FormField } from "@/components/ui/field";
import {
  AbsoluteCenter,
  Button,
  Group,
  HStack,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Form, useField } from "react-final-form";
import { isValidDomainName } from "@/utils/validators";
import { useDomainCheck } from "@/api/domains/hooks";
import { useNavigate } from "react-router-dom";

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
      <Group attached w="full">
        <Input {...input} id={name} placeholder={placeholder || label} />
        <Button type="submit" disabled={isLoading || meta.error}>
          {buttonText}
          {isLoading && <Spinner size="xs" />}
        </Button>
      </Group>
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
          <HStack minW={["90%", "450px"]}>
            <InputControl
              error={error}
              isLoading={isPending}
              name="domainName"
              label="Watch a domain name"
              placeholder="example.com"
              buttonText={isPending ? "Checking..." : "Check domain"}
            />
          </HStack>
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
