import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {StorybookDataUtils} from '../../../utils/StorybookDataUtils/StorybookDataUtils';
import {
  FoodUpdatePagePresenter,
} from '../../../../src/frontend/website/components/pages/Food/FoodUpdatePage/components/FoodUpdatePagePresenter/FoodUpdatePagePresenter';

const meta = {
  title: 'Pages/Food/Food Update Page',
  component: FoodUpdatePagePresenter,
  tags: ['autodocs'],
  globals: {
  },
  args: {
    onSave: () => {},
    onDelete: () => {},
    response: {
      isLoading: false,
      isError: false,
      data: {
        data: StorybookDataUtils.food.getFood('apple'),
        error: undefined,
      },
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Food Update Page',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} column type={StoryBookDisplayType.Page}/>],
} satisfies Meta<typeof FoodUpdatePagePresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Food: Story = {

};

export const Meal: Story = {
  args: {
    response: {
      isLoading: false,
      isError: false,
      data: {
        data: StorybookDataUtils.food.getFood('omelette'),
        error: undefined,
      },
    },
  },
};

export const IngredientsWithoutPicture: Story = {
  args: {
    response: {
      isLoading: false,
      isError: false,
      data: {
        data: StorybookDataUtils.food.getCoffee(),
        error: undefined,
      },
    },
  },
};
