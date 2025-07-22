import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookColorOverview} from '../../components/StoryBookColorOverview/StoryBookColorOverview';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';

const meta = {
  title: 'Colors/Colors Overview',
  component: StoryBookColorOverview,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Colors shared accross all palettes',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} />],
} satisfies Meta<typeof StoryBookColorOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Theme: Story = {

  render: () => <StoryBookColorOverview/>,
};
