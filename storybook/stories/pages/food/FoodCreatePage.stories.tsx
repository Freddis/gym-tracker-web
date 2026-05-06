import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {
  FoodCreatePagePresenter,
} from '../../../../src/frontend/website/components/pages/Food/FoodCreatePage/components/FoodCreatePagePresenter';

const meta = {
  title: 'Pages/Food/Food Create Page',
  component: FoodCreatePagePresenter,
  tags: ['autodocs'],
  globals: {
  },
  args: {
    onSave: () => {},
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
} satisfies Meta<typeof FoodCreatePagePresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Food: Story = {

};

export const Meal: Story = {
  args: {
    isMeal: true,
  },
};
