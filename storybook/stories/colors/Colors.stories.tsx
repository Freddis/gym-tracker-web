import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookColorOverview} from '../../components/StoryBookColorOverview/StoryBookColorOverview';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';

const meta = {
  title: 'Colors/Colors Overview',
  component: StoryBookColorOverview,
  tags: ['autodocs'],
  globals: {
    viewport: {value: 'tablet', isRotated: false},
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Primary (Background) colors used in palettes',
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
