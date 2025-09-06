import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../../src/frontend/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../../components/StoryBookDisplay/StoryBookDisplay';
import {EntryAddScreen} from './EntryAddScreen';

const meta = {
  title: 'IOS/Entries/Entry Create',
  component: EntryAddScreen,
  tags: ['autodocs'],
  globals: {
    viewport: {value: 'tablet', isRotated: false},
  },
  args: {
    minimal: true,
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
} satisfies Meta<typeof EntryAddScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Minimal: Story = {
  args: {
    minimal: true,
  },
};

export const Full: Story = {

  args: {
    minimal: false,
  },
};

