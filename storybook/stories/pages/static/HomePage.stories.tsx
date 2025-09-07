import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {HomePage} from '../../../../src/frontend/components/pages/Home/HomPage';

const meta = {
  title: 'Pages/Static/Home',
  component: HomePage,
  tags: ['autodocs'],
  globals: {
  },
  args: {

  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The front page of the website',
      },
    },
  },
  decorators: [
    (Story) => <StoryBookDisplay story={<Story/>} column type={StoryBookDisplayType.Page}/>,
  ],
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

