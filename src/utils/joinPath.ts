function removeLeadingSlash(path: string) {
  return path.replace(/^\//, '');
}

function removeTrailingSlash(path: string) {
  return path.replace(/\/$/, '');
}

function removeTrailingAndLeadingSlash(path: string) {
  return removeLeadingSlash(removeTrailingSlash(path));
}

export function joinPath(rootPath: string, ...paths: string[]) {
  return [removeTrailingSlash(rootPath), ...paths.map(removeTrailingAndLeadingSlash)].join('/');
}
