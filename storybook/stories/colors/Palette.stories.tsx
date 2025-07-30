import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookPaletteOverview} from '../../components/StoryBookPaletteOverview/StoryBookPaletteOverview';
import {Color} from '../../../src/frontend/utils/design-system/types/Color';

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
        value: Object.values(Color),
      },
    },
  },
  render: (args) => <StoryBookPaletteOverview palette={args.palette} />,
} satisfies Meta<typeof StoryBookPaletteOverview>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Lightest: Story = {
  args: {
    palette: Color.Lightest,
  },
};

export const Neutral: Story = {
  args: {
    palette: Color.Neutral,
  },
};

export const Darkest: Story = {
  args: {
    palette: Color.Darkest,
  },
};

export const Success: Story = {
  args: {
    palette: Color.Success,
  },
};

export const Info: Story = {
  args: {
    palette: Color.Info,
  },
};

export const Warning: Story = {
  args: {
    palette: Color.Warning,
  },
};

export const Danger: Story = {
  args: {
    palette: Color.Danger,
  },
};

export const Accent: Story = {
  args: {
    palette: Color.Accent,
  },
};
