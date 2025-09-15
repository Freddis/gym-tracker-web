import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [
      '**/*.e2e.spec.ts',
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
        'scripts',
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
