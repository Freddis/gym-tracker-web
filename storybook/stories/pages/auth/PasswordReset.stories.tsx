import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {PasswordResetPage} from '../../../../src/frontend/website/components/pages/Auth/PasswordResetPage/PasswordResetPage';

const meta = {
  title: 'Pages/Auth/PasswordReset',
  component: PasswordResetPage,
  tags: ['autodocs'],
  globals: {
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
} satisfies Meta<typeof PasswordResetPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
};
