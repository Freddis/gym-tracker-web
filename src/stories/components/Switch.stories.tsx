import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../frontend/components/atoms/StoryBookDisplay/StoryBookDisplay';
import {Switch} from '../../frontend/components/atoms/Switch/Switch';
import {PaletteName} from '../../frontend/enums/PaletteName';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Boolean switch for things like dark mode',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={Story} palette={PaletteName.Lightest} />],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {
};

export const WithLabel: Story = {
  render: () => <Switch label="Click on label and switch will go off"/>,
};
