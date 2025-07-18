import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['verbose', 'html'],

    coverage: {
      reportsDirectory: 'html/coverage',
      exclude: [
        'storybook',
        '.output/**',
        '.vinxi/**',
        '.tanstack/**',
        '.nitro/**',
      ],
      reporter: [
        ['text'],
        ['html-spa', {subdir: 'spa'}],
        ['html', {subdir: 'html'}],
      ],
      provider: 'v8',
    },
  },
});
