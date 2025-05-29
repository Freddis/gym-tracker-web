import type {Meta, StoryObj} from '@storybook/react';
import {PaletteName} from '../../../../src/frontend/enums/PaletteName';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {WeightCreatePage} from '../../../../src/frontend/components/pages/Weight/WeightCreatePage/WeightCreatePage';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';

const meta = {
  title: 'Pages/Weight/Create',
  component: WeightCreatePage,
  tags: ['autodocs'],
  globals: {
    viewport: {value: 'tablet', isRotated: false},
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Login Form',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={PaletteName.Neutral} column type={StoryBookDisplayType.Page}/>],
} satisfies Meta<typeof WeightCreatePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
};
