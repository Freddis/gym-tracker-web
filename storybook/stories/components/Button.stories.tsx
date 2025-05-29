import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';
import {AppButton} from '../../../src/frontend/components/atoms/AppButton/AppButton';

const meta = {
  title: 'Components/Button',
  component: AppButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {children: 'Button'},
  decorators: [
    (Story) => <StoryBookDisplay story={<Story/>} />,
  ],

} satisfies Meta<typeof AppButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {
  render: (args) => <AppButton variant={args.variant}>{args.children}</AppButton>,
};

export const Neutral: Story = {
  render: () => <AppButton variant="neutral">Button</AppButton>,
};
