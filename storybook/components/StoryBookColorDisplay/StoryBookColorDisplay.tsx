import {FC} from 'react';
import {oklch, formatHex, Oklch} from 'culori';

export const StoryBookColorDisplay: FC<{name: string, value: string}> = (props) => {
  const name = props.name.charAt(0).toUpperCase() + props.name.slice(1);
  const getTwClass = (color: string) => {
    if (!color.includes('var(')) {
      return '';
    }
    const colorName = props.value.replaceAll('var(--color-', '').replaceAll(')', '');
    return `bg-${colorName}`;
  };
  const cssColorToHex = (color: string) => {
    if (color.includes('oklch(')) {
      const parts = color.replace('oklch(', '').replace(')', '').split(' ').map(Number);
      const oklchColor: Oklch = {mode: 'oklch', l: parts[0] ?? 0, c: parts[1] ?? 0, h: parts[2] ?? 0};
      const hexColor = formatHex(oklch(oklchColor));
      return hexColor;
    }
    const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/);
    if (match === null) {
      return color;
    }
    const value = match.slice(1)
      .map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
      .toString(16)
      .padStart(2, '0')
      .replace('NaN', ''))
      .join('');
    return '#' + value;
  };

  const className = getTwClass(props.value);
  const div = document.createElement('div');
  div.className = className;
  div.style.backgroundColor = props.value;
  document.body.appendChild(div);
  const style = getComputedStyle(div);
  const color = cssColorToHex(style.backgroundColor);
  return (
    <div className="table-row bg-lightest text-on-lightest">
      <div className={'w-20 h-20 table-cell border-1 border-neutral-400'} style={{backgroundColor: color}}></div>
      <div className="w-50 table-cell border-1 border-neutral-400 align-middle p-5 font-mono text-sm">{color}</div>
      <div className="w-50 table-cell border-1 border-neutral-400 align-middle p-5">{name}</div>
    </div>
  );
};
