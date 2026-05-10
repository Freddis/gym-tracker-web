import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {
  UserEntriesPagePresenter,
} from '../../../../src/frontend/website/components/pages/profile/UserEntriesPage/components/UserEntriesPagePresenter';
import {StorybookDataUtils} from '../../../utils/StorybookDataUtils/StorybookDataUtils';

const meta = {
  title: 'Pages/User/Entries',
  component: UserEntriesPagePresenter,
  tags: ['autodocs'],
  globals: {
  },
  args: {
    onPageChanged: () => {},
    onDateChanged: () => {},
    onFilter: () => {},
    onClearFilters: () => {},
    searchParams: {
      page: 1,
      type: [],
      date: undefined,
    },
    response: {
      isLoading: false,
      isError: false,
      data: {
        data: {
          items: [
            StorybookDataUtils.getEntry(),
            StorybookDataUtils.getEntry(),
            StorybookDataUtils.getEntry(),
            StorybookDataUtils.getEntry(),
            StorybookDataUtils.getEntry(),
          ],
          info: {count: 10, page: 1, pageSize: 5},
        },
        error: undefined,
      },
    },
    userResponse: {
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
} satisfies Meta<typeof UserEntriesPagePresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};
