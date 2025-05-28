import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['verbose', 'html'],

    coverage: {
      reportsDirectory: 'html/coverage',
      reporter: [
        ['html-spa', {subdir: 'spa'}],
        ['html', {subdir: 'html'}],
      ],
      provider: 'v8',
    },
  },
});
