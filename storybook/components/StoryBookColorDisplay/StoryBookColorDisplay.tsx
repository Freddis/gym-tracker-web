import {FC} from 'react';

export const StoryBookColorDisplay: FC<{name: string, value: string}> = (props) => {
  const rgba2hex = (rgba: string) => {
    const match = rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/);
    if (match === null) {
      return 'error';
    }
    const value = match.slice(1)
      .map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
      .toString(16)
      .padStart(2, '0')
      .replace('NaN', ''))
      .join('');
    return '#' + value;
  };
  const div = document.createElement('div');
  div.style = 'background-color: ' + props.value;
  document.body.appendChild(div);
  const style = getComputedStyle(div);
  const color = rgba2hex(style.backgroundColor);
  document.body.removeChild(div);
  const name = props.name.charAt(0).toUpperCase() + props.name.slice(1);
  return (
    <div className="table-row bg-lightest text-on-lightest">
      <div className={'w-20 h-20 table-cell border-1 border-neutral-400'} style={{backgroundColor: color}}></div>
      <div className="w-30 table-cell border-1 border-neutral-400 align-middle p-5 font-mono">{color}</div>
      <div className="w-50 table-cell border-1 border-neutral-400 align-middle p-5">{name}</div>
    </div>
  );
};
