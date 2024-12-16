export interface ContactInfo {
  name: string;
  company: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country_name: string;
  country_code: string;
  email_address: string;
  phone: string;
  fax?: string; // Added fax number as optional
}

export interface DomainRegistrar {
  iana_id: string; // Added iana_id
  registrar_name: string;
  whois_server: string; // Changed from website_url to whois_server
  website_url: string; // Added website_url
  email_address: string;
  phone_number: string;
}

interface DomainCheckResponse {
  status: number;
  statusText: string;
}

export interface DomainDetails {
  status: boolean;
  domain_name: string;
  query_time: string;
  whois_server: string;
  domain_registered: string;
  create_date: string; // Added create_date
  update_date: string; // Added update_date
  expiry_date: string; // Added expiry_date
  domain_registrar: DomainRegistrar;
  registrant_contact: ContactInfo;
  administrative_contact: ContactInfo;
  technical_contact: ContactInfo;
  name_servers: string[];
  domain_status: string[];
  whois_raw_domain: string;
  domainCheck: DomainCheckResponse;
  domainName: string;
}

