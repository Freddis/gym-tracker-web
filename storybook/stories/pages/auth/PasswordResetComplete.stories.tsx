import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {
  PaswordResetCompletePagePresenter,
} from '../../../../src/frontend/website/components/pages/Auth/PaswordResetCompletePage/components/PaswordResetCompletePagePresenter';

const meta = {
  title: 'Pages/Auth/PasswordResetComplete',
  component: PaswordResetCompletePagePresenter,
  tags: ['autodocs'],
  globals: {
  },
  args: {
    onReset: async () => {},
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Password Reset Page',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} column type={StoryBookDisplayType.Page} />],
} satisfies Meta<typeof PaswordResetCompletePagePresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
};
