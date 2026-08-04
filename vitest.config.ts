import path from 'path';
import {defineConfig} from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      // otherwise vitest can't find resolve absolute paths starting from src
      // todo: remove all paths starting from src in the project and this line as well
      src: path.resolve(__dirname, 'src'),
    },
  },
  test: {
    // no parralelism, since tests use clean slate
    maxWorkers: 1,
    sequence: {
      concurrent: false,
    },
    exclude: [
      '**/*.e2e.spec.ts',
      '**/*.e2e.spec.tsx',
      'node_modules/**',
    ],
    reporters: ['verbose', 'html'],
    coverage: {
      reportsDirectory: 'html/coverage',
      exclude: [
        'html/**',
        'coverage-e2e/**',
        'storybook',
        '.output/**',
        '.vinxi/**',
        '.tanstack/**',
        '.nitro/**',
        'eslint.config.mjs',
        'e2e-test-reporter.ts',
        'vite.config.ts',
        'playwright.config.ts',
        'src/frontend/**',
        'src/routes/**',
        'src/router.tsx',
        'src/client.tsx',
        'src/routeTree.gen.ts',
        'scripts',
        '**/TestUtils/**', // want to see usage on test utils, but not frontend
      ],
      reporter: [
        ['html-spa', {subdir: 'spa'}],
        ['html', {subdir: 'html'}],
        ['text'],
      ],
      provider: 'istanbul',
    },
  },
});
