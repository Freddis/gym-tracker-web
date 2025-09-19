import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../../src/frontend/common/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../../components/StoryBookDisplay/StoryBookDisplay';
import {StorybookDataUtils} from '../../../../utils/StorybookDataUtils/StorybookDataUtils';
import {EntryListScreen} from './EntryListScreen';

const meta = {
  title: 'IOS/Entries/Entry List',
  component: EntryListScreen,
  tags: ['autodocs'],
  globals: {
    viewport: {value: 'tablet', isRotated: false},
  },
  args: {
    workout: {
      obj: StorybookDataUtils.getWorkout(),
      entry: StorybookDataUtils.getEntry(),
    },
    weight: {
      obj: StorybookDataUtils.getWeight(),
      entry: StorybookDataUtils.getEntry(),
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Shows the list of entries that user has added',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} />],
} satisfies Meta<typeof EntryListScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};

