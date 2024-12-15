type WhoisResult = {
  attribute: string;
  value: string;
};

export type DomainCheck = {
  status: number;
  statusText: string;
};

export type WhoisResponse = {
  type: 'client' | 'api';
  error?: string;
  result?: WhoisResult[];
  domainCheck?: DomainCheck;
  domainName: string;
  expiryDate?: number;
};
