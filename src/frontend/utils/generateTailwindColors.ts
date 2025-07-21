import {writeFileSync} from 'fs';
import {PaletteSet} from 'src/frontend/types/PaletteSet';
import {colors} from 'src/frontend/utils/colors';
import {palettes} from 'src/frontend/utils/palettes';

const generateTailwindColorClasses = (palettes: PaletteSet, type: 'light' | 'dark'): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const [name, palette] of Object.entries(palettes)) {
    result[`${name.toLowerCase()}`] = palette[type].color;
    result[`on-${name.toLowerCase()}`] = palette[type].text;
    if (palette[type].surface) {
      result[`${name.toLowerCase()}-surface`] = palette[type].surface.color;
      result[`on-${name.toLowerCase()}-surface`] = palette[type].surface.text;
    }
    if (palette[type].cavity) {
      result[`${name.toLowerCase()}-cavity`] = palette[type].cavity.color;
      result[`on-${name.toLowerCase()}-cavity`] = palette[type].cavity.text;
    }
  }
  return result;
};

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

export const generateTailwindColorsOnUpdate = async () => {
  const dark = generateTailwindColorClasses(palettes, 'dark');
  const light = generateTailwindColorClasses(palettes, 'light');
  const twNames = getTailWindColorsFromObject({palettes, colors});
  const inline = [
    ...twNames.map((x) => `bg-${x}`),
    ...twNames.map((x) => `color-${x}`),
  ].join(',');
  const lines = [
    `@source inline("${inline}");`,
    '@theme  inline {',
    ...Object.entries(dark).map((x) => `--color-${x[0]}: var(--color-${x[0]});`),
    // ...Object.entries(colors).map((x) => `--color-${x[0]}: var(--color-${x[0]});`),
    ...Object.entries(colors).map((x) => `--color-${x[0]}: ${x[1]};`),
    '}',
    '.theme-dark {',
    ...Object.entries(dark).map((x) => `--color-${x[0]}: ${x[1]};`),
    // ...Object.entries(colors).map((x) => `--color-${x[0]}: ${x[1]};`),
    '}',
    '.theme-light {',
    ...Object.entries(light).map((x) => `--color-${x[0]}: ${x[1]};`),
    // ...Object.entries(colors).map((x) => `--color-${x[0]}: ${x[1]};`),
    '}',
  ];
  const content = lines.join('\n');
  writeFileSync('./src/frontend/css/colors.gen.css', content);
};
