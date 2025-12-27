import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import * as fs from 'fs';
import { inlineHeadPlugin } from './vite-plugin-inline-head';

const srcPath = path.join(__dirname, 'src');

const alias = fs
  .readdirSync(srcPath, { withFileTypes: true })
  .filter((el) => el.isDirectory())
  .map((el) => ({
    find: el.name,
    replacement: path.resolve(path.join(srcPath, el.name)),
  }));

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), ['VITE_', 'POSTHOG_']) };

  const plugins = [
    inlineHeadPlugin({
      scriptPath: './src/head.ts',
    }),
    react(),
  ];

  if (process.env.POSTHOG_PERSONAL_API_KEY && process.env.VITE_PUBLIC_POSTHOG_KEY) {
    const { default: posthogRollupPlugin } = await import('@posthog/rollup-plugin');
    plugins.push(
      posthogRollupPlugin({
        personalApiKey: process.env.POSTHOG_PERSONAL_API_KEY,
        envId: process.env.POSTHOG_ENV_ID!,
        host: process.env.VITE_PUBLIC_POSTHOG_HOST,
        sourcemaps: {
          deleteAfterUpload: true,
        },
      }),
    );
  }

  return {
    plugins,
    base: '/',
    resolve: {
      alias,
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    },
    build: {
      sourcemap: true,
    },
  };
});
