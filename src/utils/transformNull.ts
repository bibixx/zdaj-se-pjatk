export const transformNull = <T>(v: T | null) => (v === null ? undefined : v);
