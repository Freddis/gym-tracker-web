import type {Meta, StoryObj} from '@storybook/react';

import {Color} from '../../../src/frontend/common/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';
import {AppDatepicker} from '../../../src/frontend/common/components/atoms/AppDatepicker/AppDatepicker';
import {TimeUtils} from '../../../src/backend/utils/TestUtils/utils/TimeUtils';

const meta = {
  title: 'Components/DatePicker',
  component: AppDatepicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A date picker component',
      },
    },
  },
  args: {
  },
  decorators: [(Story) => <StoryBookDisplay className="min-h-100" story={<Story/>} palette={Color.Lightest} />],
} satisfies Meta<typeof AppDatepicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};

export const MarkedDays: Story = {
  args: {
    onChange: () => {},
    markedDays: [
      TimeUtils.getDayAgo(0),
      TimeUtils.getDayAgo(1),
      TimeUtils.getDayAgo(5),
    ],
  },
};

export const DateOnly: Story = {
  args: {
    onChange: () => {},
    dateOnly: true,
  },
};


