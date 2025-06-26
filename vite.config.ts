import {tanstackStart} from '@tanstack/react-start/plugin/vite';
import {execSync} from 'child_process';
import {defineConfig} from 'vite';
import {isoImport} from 'vite-plugin-iso-import';
import tsConfigPaths from 'vite-tsconfig-paths';

let generationSkip = false;
export default defineConfig({

  // root: './src',
  // root: './',
  build: {
    target: 'es2022',
    outDir: '.output',
  },
  // esbuild: {
  //   target: 'es2022',
  // },
  optimizeDeps: {
    // fixes html import problem deep in node_modules in dev
    exclude: ['@mapbox'],
    // esbuildOptions: {
    //   target: 'es2022',
    // },
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
