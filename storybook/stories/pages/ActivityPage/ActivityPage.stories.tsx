import type {Meta, StoryObj} from '@storybook/react';
import {ActivityPage} from '../../../../src/frontend/components/pages/Activities/AcitivtiesPage';
import {Color} from '../../../../src/frontend/enums/Color';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';

const meta = {
  title: 'Pages/ActivityPage',
  component: ActivityPage,
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
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} column type={StoryBookDisplayType.Page} user/>],
} satisfies Meta<typeof ActivityPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
};
