export const isValidDomainName = (value: string) => {
  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return domainRegex.test(value);
};
