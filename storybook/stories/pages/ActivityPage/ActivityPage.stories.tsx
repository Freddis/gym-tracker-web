import type {Meta, StoryObj} from '@storybook/react';
import {ActivityPage} from '../../../../src/frontend/components/pages/Activities/AcitivtiesPage';
import {PaletteName} from '../../../../src/frontend/enums/PaletteName';
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
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={PaletteName.Neutral} column type={StoryBookDisplayType.Page} user/>],
} satisfies Meta<typeof ActivityPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
};
