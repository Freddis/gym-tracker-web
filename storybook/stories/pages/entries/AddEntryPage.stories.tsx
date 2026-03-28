import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../src/frontend/common/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {WeightCreatePage} from '../../../../src/frontend/website/components/pages/Weight/WeightCreatePage/WeightCreatePage';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {AddEntryPage} from '../../../../src/frontend/website/components/pages/Activities/AddEntryPage/AddEntryPage';

const meta = {
  title: 'Pages/Entries/Add Entry Page',
  component: AddEntryPage,
  tags: ['autodocs'],
  globals: {
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Entry Type Selection Page',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} column type={StoryBookDisplayType.Page} user={true}/>],
} satisfies Meta<typeof WeightCreatePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
};
