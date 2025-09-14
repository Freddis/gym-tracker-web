
import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../src/frontend/common/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {StorybookDataUtils} from '../../../utils/StorybookDataUtils/StorybookDataUtils';
import {WeightEntryBlock} from '../../../../src/frontend/website/components/blocks/EntryBlock/components/WeightEntryBlock';

const meta = {
  title: 'Blocks/Weight',
  component: WeightEntryBlock,
  tags: ['autodocs'],
  args: {
    weight: StorybookDataUtils.getWeight(),
    entry: StorybookDataUtils.getEntry(),
    own: false,
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Weight Block',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} className="w-full" layoutClassName="w-full" />],
} satisfies Meta<typeof WeightEntryBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

export const OwnWorkout: Story = {
  args: {
    own: true,
  },
};
