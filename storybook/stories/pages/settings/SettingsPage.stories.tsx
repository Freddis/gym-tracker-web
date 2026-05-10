import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {
  SettingsPagePresenter,
} from '../../../../src/frontend/website/components/pages/settings/SettingsPage/components/SettingsPagePresenter/SettingsPagePresenter';
import {StorybookDataUtils} from '../../../utils/StorybookDataUtils/StorybookDataUtils';


const meta = {
  title: 'Pages/Settings/Settings',
  component: SettingsPagePresenter,
  tags: ['autodocs'],
  globals: {
  },
  args: {
    user: StorybookDataUtils.getUser(),
    response: {
      data: {
        data: StorybookDataUtils.getSettings(),
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
} satisfies Meta<typeof SettingsPagePresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};
