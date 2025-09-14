import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {ErrorPagePresenter} from '../../../../src/frontend/website/components/pages/ErrorPage/components/ErrorPagePresenter';

const meta = {
  title: 'Pages/Static/Error',
  component: ErrorPagePresenter,
  tags: ['autodocs'],
  globals: {
  },
  args: {
    error: {
      name: '',
      message: '',
    },
    reset: () => {},
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Page displaying on unhandled error',
      },
    },
  },
  decorators: [
    (Story) => <StoryBookDisplay story={<Story/>} column type={StoryBookDisplayType.Component}/>,
  ],
} satisfies Meta<typeof ErrorPagePresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

};
