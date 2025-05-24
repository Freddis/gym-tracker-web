import {defineConfig} from '@tanstack/react-start/config';
import tsConfigPaths from 'vite-tsconfig-paths';
import {execSync} from 'child_process';

let generationSkip = false;
export default defineConfig({
  tsr: {
    appDirectory: 'src',
  },
  server: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      {
        name: 'postbuild-commands', // the name of your custom plugin. Could be anything.
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
  },
});
