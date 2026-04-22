import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../src/frontend/common/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {EntryListPage} from '../../../../src/frontend/website/components/pages/Activities/EntryListPage/EntryListPage';
import {
  EntryListPagePresenter,
} from '../../../../src/frontend/website/components/pages/Activities/EntryListPage/EntryListPagePresenter/EntryListPagePresenter';
import {StorybookDataUtils} from '../../../utils/StorybookDataUtils/StorybookDataUtils';

const meta = {
  title: 'Pages/Entries/Entry List Page',
  component: EntryListPagePresenter,
  tags: ['autodocs'],
  globals: {
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Shows the list of entries that user has added',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} column type={StoryBookDisplayType.Page} user={true}/>],
} satisfies Meta<typeof EntryListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onDateChanged: () => {},
    onClearFilters: () => {},
    datesResponse: {
      isLoading: false,
      isError: false,
      data: {
        data: [],
        error: undefined,
      },
    },
    onPageChanged: () => {},
    onFilter: () => {},
    searchParams: {
      type: [],
      page: 1,
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
  },
};
export const Loading: Story = {
  args: {
    onPageChanged: () => {},
    onFilter: () => {},
    onDateChanged: () => {},
    onClearFilters: () => {},
    datesResponse: {
      isLoading: false,
      isError: false,
      data: {
        data: [],
        error: undefined,
      },
    },
    searchParams: {
      type: [],
      page: 1,
    },
    response: {
      isLoading: true,
      isError: false,
      data: {
        data: {
          items: [

          ],
          info: {count: 0, page: 1, pageSize: 5},
        },
        error: undefined,
      },
    },
  },
};
export const Empty: Story = {
  args: {
    onPageChanged: () => {},
    onFilter: () => {},
    onDateChanged: () => {},
    onClearFilters: () => {},
    datesResponse: {
      isLoading: false,
      isError: false,
      data: {
        data: [],
        error: undefined,
      },
    },
    searchParams: {
      type: [],
      page: 1,
    },
    response: {
      isLoading: false,
      isError: false,
      data: {
        data: {
          items: [

          ],
          info: {count: 0, page: 1, pageSize: 5},
        },
        error: undefined,
      },
    },
  },
};

