import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
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
