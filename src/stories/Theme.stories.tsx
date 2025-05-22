import type {Meta, StoryObj} from '@storybook/react';
import {FC} from 'react';
import {Color} from '../frontend/enums/Color';
import {colors} from '../frontend/utils/colors';

const ColorDisplay: FC<{color: Color}> = (props) => {
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
  div.className = `theme-dark bg-${props.color} w-10 h-10`;
  div.style = 'background-color: ' + colors[props.color];
  document.body.appendChild(div);
  const style = getComputedStyle(div);
  // console.log(div, style);
  const color = rgba2hex(style.backgroundColor);
  document.body.removeChild(div);
  const name = props.color.charAt(0).toUpperCase() + props.color.slice(1);
  return (
    <div className="table-row">
    <div className={'w-20 h-20 table-cell border-1 border-neutral-400'} style={{backgroundColor: color}}></div>
    <div className="w-30 table-cell border-1 border-neutral-400 align-middle p-5 font-mono">{color}</div>
    <div className="w-50 table-cell border-1 border-neutral-400 align-middle p-5">{name}</div>
  </div>
  );
};
const ColorPalette: FC = () => {
  const colors = Object.values(Color);
  return (
    <div className="table border-collapse">
      {colors.map((x) => <ColorDisplay color={x}/>)}
    </div>
  );
};
const meta = {
  title: 'Colors/Theme',
  component: ColorPalette,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Colors shared accross all palettes',
      },
    },
  },
  // decorators: [(Story) => <StoryBookDisplay story={Story} noPadding />],
} satisfies Meta<typeof ColorPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Theme: Story = {
  render: () => <ColorPalette/>,
};
