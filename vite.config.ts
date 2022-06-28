import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

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
  plugins: [react()],
  base: '/',
  resolve: { alias },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }
});
