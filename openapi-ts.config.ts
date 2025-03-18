import {defineConfig} from '@hey-api/openapi-ts';
import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

export default defineConfig({
//   '@hey-api/client-axios',
  input: {
    path: './src/routes/api/html/openapi.yml',
  },
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/lib/data/client/api',
  },
//   debug: false,
  plugins: ['@hey-api/client-axios', '@tanstack/react-query'],
});
