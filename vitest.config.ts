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
        'storybook',
        '.output/**',
        '.vinxi/**',
        '.tanstack/**',
        '.nitro/**',
        'eslint.config.mjs',
        'src/frontend/**',
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
