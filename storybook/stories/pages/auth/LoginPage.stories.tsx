import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {LoginPage} from '../../../../src/frontend/components/pages/Auth/LoginPage/LoginPage';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';

const meta = {
  title: 'Pages/Auth/LoginPage',
  component: LoginPage,
  tags: ['autodocs'],
  globals: {
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Login Page',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} column type={StoryBookDisplayType.Page} />],
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <LoginPage/>,
};
