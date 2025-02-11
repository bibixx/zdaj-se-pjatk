type ConstructUrlOptions = {
  protocol?: string;
  port?: number;
};

function getHost(domain: string) {
  const url = new URL('http://example.com');

  let changedDomain = domain;
  // Check if the domain includes a port
  const portMatch = domain.match(/:(\d+)$/);
  const stringPort = portMatch?.[1];

  if (stringPort != null) {
    url.port = stringPort;
    changedDomain = domain.replace(/:\d+$/, '');
  }

  // Check if the domain starts with a protocol, if not, default to 'http://'
  if (changedDomain.startsWith('http://')) {
    url.protocol = 'http:';
    changedDomain = changedDomain.slice(7);
  } else if (changedDomain.startsWith('https://')) {
    url.protocol = 'https:';
    changedDomain = changedDomain.slice(8);
  } else if (changedDomain.startsWith('//')) {
    url.protocol = window.location.protocol;
    changedDomain = changedDomain.slice(2);
  }

  url.hostname = changedDomain.replace(/\/.*/, '');

  return url.toString();
}

export function constructUrl(domain: string, pathname: string, stringify: true, options?: ConstructUrlOptions): string;
export function constructUrl(domain: string, pathname: string, stringify?: false, options?: ConstructUrlOptions): URL;
export function constructUrl(
  domain: string,
  pathname: string = '/',
  stringify: boolean = false,
  { protocol, port }: ConstructUrlOptions = {},
): string | URL {
  const url = new URL(pathname, getHost(domain));
  url.protocol = protocol ?? window.location.protocol;

  if (port) {
    url.port = port.toString();
  }

  if (stringify) {
    return url.toString();
  }

  return url;
}

export function cloneUrl(url: URL): URL {
  return new URL(url.toString());
}
