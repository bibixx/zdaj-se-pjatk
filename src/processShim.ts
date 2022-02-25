if (import.meta.env.MODE === 'production') {
  (window as any).process = { env: { NODE_ENV: import.meta.env.MODE } };
}
