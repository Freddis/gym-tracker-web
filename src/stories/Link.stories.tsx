import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../frontend/components/atoms/StoryBookDisplay/StoryBookDisplay';
import {AppLink} from '../frontend/components/atoms/AppLink/AppLink';

const meta = {
  title: 'Components/Link',
  component: AppLink,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Basic text link for redirects',
      },
    },
  },
  args: {children: 'Button'},
  decorators: [(Story) => <StoryBookDisplay story={Story} />],
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {
  render: () => <AppLink>Click Me</AppLink>,
};
