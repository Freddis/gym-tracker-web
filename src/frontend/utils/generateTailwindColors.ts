import {writeFileSync} from 'fs';
import {palettes} from 'src/frontend/utils/palettes';
import {Color} from '../enums/Color';


const getTailWindColorsFromObject = (obj: object): string[] => {
  const result: string[] = [];
  for (const val of Object.values(obj)) {
    if (typeof val === 'string' && val.includes('var(--color-')) {
      const color = val.replace('var(--color-', '').replace(')', '');
      result.push(color);
    }
    if (typeof val === 'object') {
      result.push(...getTailWindColorsFromObject(val));
    }
  }
  return result;
};

const getPaletteVariables = (color: Color, mode: 'dark'|'light') => {
  const palette = palettes[color][mode];
  const lines: string[] = [
    `.theme-${mode} .palette-${color} {`,
  ];
  lines.push(...[
    `--color-main: ${palette.color};`,
    `--color-on-main: ${palette.text};`,
  ]);
  if (palette.surface) {
    lines.push(...[
      `--color-surface: ${palette.surface.color};`,
      `--color-on-surface: ${palette.surface.text};`,
    ]);
  }
  if (palette.cavity) {
    lines.push(...[
      `--color-cavity: ${palette.cavity.color};`,
      `--color-on-cavity: ${palette.cavity.text};`,
    ]);
  }
  lines.push('}');
  return lines;
};

const getAllPaletteVariables = () => {
  const result: string[] = [];
  for (const color of Object.values(Color)) {
    result.push(
      ...getPaletteVariables(color, 'light'),
      ...getPaletteVariables(color, 'dark')
    );
  }
  return result;
};

export const generateTailwindColorsOnUpdate = async () => {
  const twNames = Array.from(new Set<string>([
    ...getTailWindColorsFromObject({palettes}),
    ...Object.values(Color),
  ]));
  const alwaysPresentClasses = [
    ...twNames.map((x) => `bg-${x}`),
    ...twNames.map((x) => `text-${x}`),
  ].map((x) => `@source inline("${x}");`);

  const paleteVariables = getAllPaletteVariables();
  const fileLines = [
    ...alwaysPresentClasses,
    '@theme  inline {',
    `--color-accent: ${palettes.accent.light.color};`,
    '--color-main: var(--color-main);',
    '--color-on-main: var(--color-on-main);',
    '--color-surface: var(--color-surface);',
    '--color-on-surface: var(--color-on-surface);',
    '--color-cavity: var(--color-cavity);',
    '--color-on-cavity: var(--color-on-cavity);',
    '}',
    ...paleteVariables,
  ];
  const content = fileLines.join('\n');
  writeFileSync('./src/frontend/css/colors.gen.css', content);
};
