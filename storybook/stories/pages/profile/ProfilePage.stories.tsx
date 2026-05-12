import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {
  ProfilePagePresenter,
} from '../../../../src/frontend/website/components/pages/profile/ProfilePage/components/ProfilePagePresenter';
import {StorybookDataUtils} from '../../../utils/StorybookDataUtils/StorybookDataUtils';

const meta = {
  title: 'Pages/Profile/Profile',
  component: ProfilePagePresenter,
  tags: ['autodocs'],
  globals: {
  },
  args: {
    own: true,
    response: {
      data: {
        data: StorybookDataUtils.getProfile(),
        error: undefined,
      },
      isLoading: false,
      isError: false,
    },
    user: StorybookDataUtils.getUser(),
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

