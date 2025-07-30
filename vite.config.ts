import {tanstackStart} from '@tanstack/react-start/plugin/vite';
import {execSync} from 'child_process';
import {argv} from 'process';
import {defineConfig} from 'vite';
import {isoImport} from 'vite-plugin-iso-import';
import tsConfigPaths from 'vite-tsconfig-paths';

let generationSkip = false;
export default defineConfig({
  build: {
    target: 'es2022',
    outDir: '.output',
  },
  publicDir: './src/frontend/utils/public',
  optimizeDeps: {
    // fixes html import problem deep in node_modules in dev
    exclude: ['@mapbox'],
  },
  server: {
    port: 3000,
  },
  plugins: [
    isoImport(),
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart(),
    {
      name: 'postbuild-commands',
      watchChange: async () => {
        const isStoryBook = argv.join().includes('storybook');
        if (isStoryBook) {
          return;
        }
        if (generationSkip) {
          return;
        }
        generationSkip = true;
        setTimeout(() => {
          generationSkip = false;
        }, 1000);
        console.log('Generating colors, file: colors.gen.css ');
        try {
          execSync('tsx ./scripts/tailwind/generateColors.ts');
        } catch (e) {
          console.log('Error during color generation', e);
        }
      },
    },
  ],
});
