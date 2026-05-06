import type {Meta, StoryObj} from '@storybook/react';
import {
  FoodListPagePresenter,
} from '../../../../src/frontend/website/components/pages/Food/FoodListPage/components/FoodListPagePresenter/FoodListPagePresenter';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {StorybookDataUtils} from '../../../utils/StorybookDataUtils/StorybookDataUtils';

const meta = {
  title: 'Pages/Food/Food List',
  component: FoodListPagePresenter,
  tags: ['autodocs'],
  globals: {
  },
  args: {
    filters: {
      search: '',
    },
    response: {
      isLoading: false,
      isError: false,
      data: {
        data: {
          items: [
            StorybookDataUtils.food.getFood('omelette'),
            StorybookDataUtils.food.getSugar(),
            StorybookDataUtils.food.getFood('apple'),
            StorybookDataUtils.food.getFood('coffee'),
          ],
          info: {
            count: 100,
            page: 1,
            pageSize: 10,
          },
        },
        error: undefined,
      },
    },
    onPageChanged: () => {},
    onSearch: () => {},
    onClearFilters: () => {},
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Food List Page',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} column type={StoryBookDisplayType.Page}/>],
} satisfies Meta<typeof FoodListPagePresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};
