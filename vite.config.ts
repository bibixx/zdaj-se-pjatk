import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
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
export default defineConfig({
  plugins: [
    inlineHeadPlugin({
      scriptPath: './src/head.ts',
    }),
    react(),
    sentryVitePlugin({
      org: 'bibixx',
      project: 'zdaj-se',
    }),
  ],
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
});
