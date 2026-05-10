import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {
  ProfilePagePresenter,
} from '../../../../src/frontend/website/components/pages/profile/ProfilePage/components/ProfilePagePresenter';
import {StorybookDataUtils} from '../../../utils/StorybookDataUtils/StorybookDataUtils';

const meta = {
  title: 'Pages/User/Profile',
  component: ProfilePagePresenter,
  tags: ['autodocs'],
  globals: {
  },
  args: {
    response: {
      data: {
        data: StorybookDataUtils.getUser(),
        error: undefined,
      },
      isLoading: false,
      isError: false,
    },
  },
  parameters: {
    layout: 'centered',
    language: 'en',
    docs: {
      description: {
        component: 'Exercise Library Page',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} column user type={StoryBookDisplayType.Page}/>],
} satisfies Meta<typeof ProfilePagePresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};
