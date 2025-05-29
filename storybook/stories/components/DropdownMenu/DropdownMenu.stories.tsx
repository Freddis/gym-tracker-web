import type {Meta, StoryObj} from '@storybook/react';
import {AppDropdownMenu} from '../../../../src/frontend/components/atoms/AppDropdownMenu/AppDropdownMenu';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {
  ProfileDropdownMenu,
} from '../../../../src/frontend/components/layout/Header/components/ProfileDropdownMenu/ProfileDropdownMenu';
import {AppLanguageDropdown} from '../../../../src/frontend/components/atoms/AppLanguageDropdown/AppLanguageDropdown';

const meta = {
  title: 'Components/DropdownMenu',
  component: AppDropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {children: 'Button'},
  decorators: [
    (Story) => <StoryBookDisplay story={<Story/>} />,
  ],

} satisfies Meta<typeof AppDropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Profile: Story = {
  render: () => <ProfileDropdownMenu/>,
};

export const Language: Story = {
  render: () => <AppLanguageDropdown/>,
};

