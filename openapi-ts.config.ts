import {defineConfig} from '@hey-api/openapi-ts';
import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

export default defineConfig({
  input: {
    path: './src/routes/api/html/openapi.yml',
  },
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/frontend/openapi-client',
  },
  plugins: [
    '@hey-api/client-axios',
    '@tanstack/react-query',
    {
      name: '@hey-api/transformers',
      dates: true,
    },
    {
      name: '@hey-api/sdk',
      transformer: true,
    },
    {
      name: '@hey-api/typescript',
      enums: 'javascript',
    },
  ],
});
