// Define the types for the domain contact information
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

// Define the type for the registrar information
interface Registrar {
  id: string;
  name: string;
  email: string;
  url: string;
  phone: string;
}

// Define the type for the JSON response of a domain search
interface DomainSearchResponse {
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

export type DomainSearch = {
  id: string;
  domain_name: string;
  json_response: DomainSearchResponse;
  created_at: string;
};

// Define the type for each domain search entry
export interface DomainSearchEntry {
  id: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  domain_search: DomainSearch;
}

// Define the type for the entire data structure
export type DomainSearchData = DomainSearchEntry[];
