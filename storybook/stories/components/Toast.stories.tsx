import type {Meta, StoryObj} from '@storybook/react';
import {AppToast} from '../../../src/frontend/components/atoms/AppToast/AppToast';
import {PaletteName} from '../../../src/frontend/enums/PaletteName';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';

const meta = {
  title: 'Components/Toast',
  component: AppToast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {children: 'This is a message', variant: PaletteName.Info},
  argTypes: {
    variant: {
      type: {
        name: 'enum',
        value: Object.values(PaletteName),
      },
    },
  },
  decorators: [
    (Story) => <StoryBookDisplay story={Story} column />,
  ],

} satisfies Meta<typeof AppToast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: PaletteName.Info,
    children: 'This is a harmless info message',
  },
};
export const Success: Story = {
  args: {
    variant: PaletteName.Success,
    children: 'This is a happy success message',
  },
};
export const Warning: Story = {
  args: {
    variant: PaletteName.Warning,
    children: 'This is a warning that something undesirable might happen!',
  },
};
export const Danger: Story = {
  args: {
    variant: PaletteName.Danger,
    children: "You're fucked!",
  },
};

