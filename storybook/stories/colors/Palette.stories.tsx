import type {Meta, StoryObj} from '@storybook/react';
import {PaletteName} from '../../../src/frontend/enums/PaletteName';
import {StoryBookPaletteOverview} from '../../components/StoryBookPaletteOverview/StoryBookPaletteOverview';

const meta = {
  title: 'Colors/Palette',
  component: StoryBookPaletteOverview,
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
    palette: {
      type: {
        name: 'enum',
        value: Object.values(PaletteName),
      },
    },
  },
} satisfies Meta<typeof StoryBookPaletteOverview>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Lightest: Story = {
  args: {
    palette: PaletteName.Lightest,
  },
  render: (args) => <StoryBookPaletteOverview palette={args.palette} />,
};

export const Neutral: Story = {
  args: {
    palette: PaletteName.Neutral,
  },
  render: (args) => <StoryBookPaletteOverview palette={args.palette} />,
};

export const Darkest: Story = {
  args: {
    palette: PaletteName.Darkest,
  },
  render: (args) => <StoryBookPaletteOverview palette={args.palette} />,
};
