import type {Meta, StoryObj} from '@storybook/react';
import {PaletteName} from '../../../src/frontend/enums/PaletteName';
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
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={PaletteName.Lightest} />],
} satisfies Meta<typeof AppSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {
};

