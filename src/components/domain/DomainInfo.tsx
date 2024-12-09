import { DomainSearchEntry } from "@/types";
import { formatDate } from "@/utils/date";
import { AccordionRoot, Box, Card, Image, Table } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "../ui/accordion";

const DomainInfo = ({
  whois,
}: {
  whois: DomainSearchEntry["domain_search"];
}) => {
  return (
    <>
      {/* <CodeBlock>{JSON.stringify(whois, null, 2)}</CodeBlock> */}
      <Card.Root flexDirection="column" overflow="hidden" w="full">
        <Image
          objectFit="cover"
          maxH="170px"
          src={`https://unsplash.it/1920/1080?random&ts=${Math.random()}`}
        />
        <Box w={"full"}>
          <Card.Body>
            <Card.Title mb="2">
              {whois.json_response.name} (created at{" "}
              {formatDate(whois.created_at)})
            </Card.Title>
            <Card.Description as={"div"}>
              <AccordionRoot collapsible defaultValue={["details"]}>
                <AccordionItem value="details">
                  <AccordionItemTrigger>Details</AccordionItemTrigger>
                  <AccordionItemContent>
                    <Table.Root striped>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>Created</Table.Cell>
                          <Table.Cell>
                            {whois.json_response.created ?? "Not available"}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Changed</Table.Cell>
                          <Table.Cell>
                            {whois.json_response.changed ?? "Not available"}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Expires</Table.Cell>
                          <Table.Cell>
                            {whois.json_response.expires ?? "Not available"}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Status</Table.Cell>
                          <Table.Cell>
                            {whois.json_response.status ?? "Not available"}
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
                            {whois.json_response.nameservers.join(", ")}
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
                            {whois.json_response.registrar.name ??
                              "Not available"}
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>Id</Table.Cell>
                          <Table.Cell>
                            {whois.json_response.registrar.id ??
                              "Not available"}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Email</Table.Cell>
                          <Table.Cell>
                            {whois.json_response.registrar.email ??
                              "Not available"}
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>Url </Table.Cell>
                          <Table.Cell>
                            {whois.json_response.registrar.url ??
                              "Not available"}
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>Phone</Table.Cell>
                          <Table.Cell>
                            {whois.json_response.registrar.phone ??
                              "Not available"}
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
