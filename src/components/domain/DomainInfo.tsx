import { AccordionRoot, Box, Card, Image, Table } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "../ui/accordion";
interface Contact {
  handle: string | null;
  type: string | null;
  name: string;
  organization: string;
  email: string;
  address: string;
  zipcode: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  fax: string;
  created: string | null;
  changed: string | null;
}

interface Registrar {
  id: string;
  name: string;
  email: string;
  url: string;
  phone: string;
}

export interface WhoisResponse {
  name: string;
  created: string;
  changed: string;
  expires: string;
  dnssec: string | null;
  registered: boolean;
  status: string;
  nameservers: string[];
  contacts: {
    owner: Contact[];
    admin: Contact[];
    tech: Contact[];
  };
  registrar: Registrar;
  throttled: boolean;
}

const DomainInfo = ({ whois }: { whois: WhoisResponse }) => {
  console.log({ whois });
  return (
    <>
      {/* <CodeBlock>{JSON.stringify(whois, null, 2)}</CodeBlock> */}
      <Card.Root flexDirection="row" overflow="hidden" w="full">
        <Image
          objectFit="cover"
          maxW="170px"
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />
        <Box w={"full"}>
          <Card.Body>
            <Card.Title mb="2">{whois.name}</Card.Title>
            <Card.Description>
              <AccordionRoot
                collapsible
                multiple
                defaultValue={["details", "dns", "registrar"]}
              >
                <AccordionItem value="details">
                  <AccordionItemTrigger>Details</AccordionItemTrigger>
                  <AccordionItemContent>
                    <Table.Root striped>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>Created</Table.Cell>
                          <Table.Cell>
                            {whois.created ?? "Not available"}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Changed</Table.Cell>
                          <Table.Cell>
                            {whois.changed ?? "Not available"}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Expires</Table.Cell>
                          <Table.Cell>
                            {whois.expires ?? "Not available"}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Status</Table.Cell>
                          <Table.Cell>
                            {whois.status ?? "Not available"}
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table.Root>
                  </AccordionItemContent>
                </AccordionItem>

                <AccordionItem value="dns">
                  <AccordionItemTrigger>DNS</AccordionItemTrigger>
                  <AccordionItemContent>
                    <Table.Root striped>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>Nameservers </Table.Cell>
                          <Table.Cell>
                            {whois.nameservers.join(", ")}
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table.Root>
                  </AccordionItemContent>
                </AccordionItem>

                <AccordionItem value="registrar">
                  <AccordionItemTrigger>Registrar</AccordionItemTrigger>
                  <AccordionItemContent>
                    <Table.Root striped>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>Name</Table.Cell>
                          <Table.Cell>
                            {whois.registrar.name ?? "Not available"}
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>Id</Table.Cell>
                          <Table.Cell>
                            {whois.registrar.id ?? "Not available"}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Email</Table.Cell>
                          <Table.Cell>
                            {whois.registrar.email ?? "Not available"}
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>Url </Table.Cell>
                          <Table.Cell>
                            {whois.registrar.url ?? "Not available"}
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>Phone</Table.Cell>
                          <Table.Cell>
                            {whois.registrar.phone ?? "Not available"}
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table.Root>
                  </AccordionItemContent>
                </AccordionItem>
              </AccordionRoot>
            </Card.Description>
          </Card.Body>
          {/* <Card.Footer>
            <Button>Buy Latte</Button>
          </Card.Footer> */}
        </Box>
      </Card.Root>
    </>
  );
};

export default DomainInfo;
