import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../../src/frontend/common/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../../components/StoryBookDisplay/StoryBookDisplay';
import {WeightEntryAddScreen} from './WeightEntryAddScreen';

const meta = {
  title: 'IOS/Entries/Weight Entry Add',
  component: WeightEntryAddScreen,
  tags: ['autodocs'],
  globals: {
    viewport: {value: 'tablet', isRotated: false},
  },
  args: {

  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Adding weight entry',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} />],
} satisfies Meta<typeof WeightEntryAddScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const New: Story = {
};


export const FilledIn: Story = {
  args: {
    date: new Date(),
    weight: 78.3,
  },
};
