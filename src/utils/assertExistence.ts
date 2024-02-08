export function assertExistence<T>(
  value: T | null | undefined,
  message = `Expected ${value} not to be nullable`,
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
}
