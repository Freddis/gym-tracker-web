import type {Meta, StoryObj} from '@storybook/react';
import {FC} from 'react';
import {Palette} from '../frontend/types/Palette';
import {palettes} from '../frontend/utils/palettes';
import {PaletteName} from '../frontend/enums/PaletteName';


const ColorInfoBlock: FC<{palette: Palette, name: Exclude<keyof Palette, 'surface'>, namespace?: string}> = (props) => {
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
  const value = props.palette[props.name];
  const div = document.createElement('div');
  div.className = 'theme-dark w-10 h-10';
  div.style = 'background-color: ' + value;
  document.body.appendChild(div);
  const style = getComputedStyle(div);
  // console.log(div, style);
  const color = rgba2hex(style.backgroundColor);
  document.body.removeChild(div);
  const capitalizedName = props.name.charAt(0).toUpperCase() + props.name.slice(1);
  const name = props.namespace ? [props.namespace, capitalizedName].join(' ') : capitalizedName;
  return (
  <div className="table-row">
    <div className={'w-20 h-20 table-cell border-1 border-neutral-400'} style={{backgroundColor: color}}></div>
    <div className="w-30 table-cell border-1 border-neutral-400 align-middle p-5 font-mono">{color}</div>
    <div className="w-50 table-cell border-1 border-neutral-400 align-middle p-5">{name}</div>
  </div>
  );
};
const PaletteInfoBlock: FC<{palette: Palette, namespace?: string}> = (props) => {
  return (
    <div className="table border-collapse">
      <ColorInfoBlock palette={props.palette} name="color"/>
      <ColorInfoBlock palette={props.palette} name="text"/>
      {props.palette.surface && (
        <>
          <ColorInfoBlock palette={props.palette.surface} name="color" namespace={'Surface'}/>
          <ColorInfoBlock palette={props.palette.surface} name="text" namespace={'Surface'}/>
        </>
      )}
    </div>
  );
};
const PalleteBlock: FC<{color: PaletteName}> = (props) => {
  const palette = palettes[props.color];
  return (
    <div className="flex flex-row h-full w-full">
      <div className={'theme-light w-1/2 flex items-center justify-center'}>
        <PaletteInfoBlock palette={palette.light}/>
      </div>
      <div className={'theme-dark  w-1/2 flex items-center justify-center ml-10'}>
        <PaletteInfoBlock palette={palette.dark} />
      </div>
    </div>
  );
};

const meta = {
  title: 'Colors/Palette',
  component: PalleteBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Accent color',
      },
    },
  },
  argTypes: {
    color: {
      type: {
        name: 'enum',
        value: Object.values(PaletteName),
      },
    },
  },
  // decorators: [(Story) => <StoryBookDisplay story={Story} noPadding />],
} satisfies Meta<typeof PalleteBlock>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Lightest: Story = {
  args: {
    color: PaletteName.Lightest,
  },
  render: (args) => <PalleteBlock color={args.color} />,
};

export const Neutral: Story = {
  args: {
    color: PaletteName.Neutral,
  },
  render: (args) => <PalleteBlock color={args.color} />,
};

export const Darkest: Story = {
  args: {
    color: PaletteName.Darkest,
  },
  render: (args) => <PalleteBlock color={args.color} />,
};
