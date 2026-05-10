import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {StorybookDataUtils} from '../../../utils/StorybookDataUtils/StorybookDataUtils';
import {
  PasswordChangePagePresenter,
// eslint-disable-next-line max-len
} from '../../../../src/frontend/website/components/pages/settings/PasswordChangePage/components/PasswordChangePagePresenter/PasswordChangePagePresenter';


const meta = {
  title: 'Pages/Settings/Password Change',
  component: PasswordChangePagePresenter,
  tags: ['autodocs'],
  globals: {
  },
  args: {
    user: StorybookDataUtils.getUser(),
    onSave: async () => {},
  },
  parameters: {
    layout: 'centered',
    language: 'en',
    docs: {
      description: {
        component: 'Settings Update Page',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} column user type={StoryBookDisplayType.Page}/>],
} satisfies Meta<typeof PasswordChangePagePresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};
