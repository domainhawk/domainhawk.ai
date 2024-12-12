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
import { useDomainCheck } from "@/api/domains";
import { useNavigate } from "react-router-dom";

const InputControl = ({
  name,
  label,
  isLoading,
  buttonText,
  placeholder,
}: {
  name: string;
  label: string;
  isLoading: boolean;
  buttonText: string;
  placeholder?: string;
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
    </FormField>
  );
};

export const CreateWatchRequestForm = () => {
  const { mutateAsync: domainCheck, isPending } = useDomainCheck();
  const navigate = useNavigate();
  const onSubmit = async (values: any) => {
    const { domainName } = values;
    const res = await domainCheck(domainName);
    navigate(`/domain/${res.uuid}`);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <HStack minW={["90%", "450px"]}>
            <InputControl
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
