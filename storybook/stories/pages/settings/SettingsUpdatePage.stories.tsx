import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {
  SettingsUpdatePagePresenter,
// eslint-disable-next-line max-len
} from '../../../../src/frontend/website/components/pages/settings/SettingsUpdatePage/components/SettingsUpdatePagePresenter/SettingsUpdatePagePresenter';
import {StorybookDataUtils} from '../../../utils/StorybookDataUtils/StorybookDataUtils';


const meta = {
  title: 'Pages/Settings/Settings Update',
  component: SettingsUpdatePagePresenter,
  tags: ['autodocs'],
  globals: {
  },
  args: {
    user: StorybookDataUtils.getUser(),
    onSave: () => {},
    errors: undefined,
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
} satisfies Meta<typeof SettingsUpdatePagePresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};
