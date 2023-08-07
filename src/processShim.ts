if (import.meta.env.MODE === 'production') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).process = { env: { NODE_ENV: import.meta.env.MODE } };
}
