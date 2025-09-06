import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../../src/frontend/utils/design-system/types/Color';
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
    workout: StorybookDataUtils.getWorkout(),
    entry: StorybookDataUtils.getEntry(),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Login Form',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} column />],
} satisfies Meta<typeof EntryListScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};

