import { ContactInfo, DomainDetails, DomainRegistrar } from "@/types";
import { Box, Card, Heading, Table, Text, VStack } from "@chakra-ui/react";

interface TableRowProps {
  label: string;
  value?: string | number;
}

const TableRow = ({ label, value }: TableRowProps) => {
  if (!value) return null;
  return (
    <Table.Row>
      <Table.Cell
        fontWeight="medium"
        whiteSpace="nowrap"
        width="50%"
        maxWidth="50%"
      >
        {label}
      </Table.Cell>
      <Table.Cell
        whiteSpace="normal"
        wordBreak="break-word"
        width="50%"
        maxWidth="50%"
      >
        {value}
      </Table.Cell>
    </Table.Row>
  );
};

interface ContactTableProps {
  title: string;
  contact?: ContactInfo;
}

const ContactTable = ({ title, contact }: ContactTableProps) => {
  if (!contact) return null;
  return (
    <Card.Root>
      <Box p={4}>
        <Heading size="sm" mb={4}>
          {title}
        </Heading>

        <Table.Root size="sm" striped>
          <Table.Body>
            <TableRow label="Name" value={contact.name} />
            <TableRow label="Company" value={contact.company} />
            <TableRow label="Street" value={contact.street} />
            <TableRow label="City" value={contact.city} />
            <TableRow label="State" value={contact.state} />
            <TableRow label="ZIP Code" value={contact.zip_code} />
            <TableRow label="Country" value={contact.country_name} />
            <TableRow label="Email" value={contact.email_address} />
            <TableRow label="Phone" value={contact.phone} />
            <TableRow label="Fax" value={contact.fax} />
          </Table.Body>
        </Table.Root>
      </Box>
    </Card.Root>
  );
};

const DomainInfoTable = ({ domain }: { domain?: DomainDetails }) => {
  if (!domain) return null;
  return (
    <Card.Root>
      <Box p={4}>
        <Heading size="sm" mb={4}>
          Domain Information
        </Heading>
        <Table.Root size="sm" striped>
          <Table.Body>
            <TableRow label="Domain Name" value={domain.domain_name} />
            <TableRow
              label="Registration Status"
              value={domain.domain_registered}
            />
            <TableRow label="Created" value={domain.create_date} />
            <TableRow label="Updated" value={domain.update_date} />
            <TableRow label="Expires" value={domain.expiry_date} />
            <TableRow label="WHOIS Server" value={domain.whois_server} />
            <TableRow
              label="Name Servers"
              value={domain.name_servers?.join(", ")}
            />
            <TableRow
              label="Domain Status"
              value={domain.domain_status?.join(", ")}
            />
          </Table.Body>
        </Table.Root>
      </Box>
    </Card.Root>
  );
};

const RegistrarTable = ({ registrar }: { registrar?: DomainRegistrar }) => {
  if (!registrar) return null;
  return (
    <Card.Root>
      <Box p={4}>
        <Heading size="sm" mb={4}>
          Registrar Information
        </Heading>
        <Table.Root size="sm" striped>
          <Table.Body>
            <TableRow label="Registrar" value={registrar.registrar_name} />
            <TableRow label="IANA ID" value={registrar.iana_id} />
            <TableRow label="Website" value={registrar.website_url} />
            <TableRow label="WHOIS Server" value={registrar.whois_server} />
            <TableRow label="Email" value={registrar.email_address} />
            <TableRow label="Phone" value={registrar.phone_number} />
          </Table.Body>
        </Table.Root>
      </Box>
    </Card.Root>
  );
};

export const DomainDetailsTables = ({ data }: { data?: DomainDetails }) => {
  if (!data) return <Text>No domain information available</Text>;

  return (
    <VStack gap={6} align="stretch">
      <DomainInfoTable domain={data} />
      <RegistrarTable registrar={data.domain_registrar} />
      <ContactTable
        title="Registrant Contact"
        contact={data.registrant_contact}
      />
      <ContactTable
        title="Administrative Contact"
        contact={data.administrative_contact}
      />
      <ContactTable
        title="Technical Contact"
        contact={data.technical_contact}
      />
    </VStack>
  );
};
