import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../src/frontend/utils/design-system/types/Color';
import {AppSpinner} from '../../../src/frontend/components/atoms/AppSpinner/AppSpinner';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';

const meta = {
  title: 'Components/Spinner',
  component: AppSpinner,
  tags: ['autodocs'],
  args: {},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Loading Spinner',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Lightest} />],
} satisfies Meta<typeof AppSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {
};

