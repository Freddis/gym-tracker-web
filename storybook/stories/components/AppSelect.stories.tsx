import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';
import {AppBlock} from '../../../src/frontend/common/components/atoms/AppBlock/AppBlock';
import {AppSelect} from '../../../src/frontend/common/components/atoms/AppSelect/AppSelect';
import {Muscle} from '../../../src/backend/types/Muscle';

const meta = {
  title: 'Components/Select',
  component: AppSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    options: Object.values(Muscle).map((x) => ({label: x, value: x})),
  },
  argTypes: {
  },
  decorators: [
    (Story) => <StoryBookDisplay story={<AppBlock className="py-20 w-60 max-w-full"><Story/></AppBlock>} />,
  ],

} satisfies Meta<typeof AppSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};

