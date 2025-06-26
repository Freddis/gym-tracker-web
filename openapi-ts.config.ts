import {defineConfig} from '@hey-api/openapi-ts';
import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

export default defineConfig({
  input: {
    path: './openapi.yml',
  },
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/frontend/openapi-client',
  },
  plugins: [
    {
      name: '@hey-api/client-axios',
      throwOnError: false,
    },
    {
      name: '@tanstack/react-query',
    },
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
