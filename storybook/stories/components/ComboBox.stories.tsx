import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';
import {Muscle} from '../../../src/frontend/common/utils/openapi-client';
import {AppBlock} from '../../../src/frontend/common/components/atoms/AppBlock/AppBlock';
import {AppCombobox} from '../../../src/frontend/common/components/atoms/AppCombobox/AppCombobox';

const meta = {
  title: 'Components/ComboBox',
  component: AppCombobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    className: 'w-full',
    values: Object.values(Muscle).map((x) => ({label: x, onSelect: () => {}})),
    // selected: createTagValues([Muscle.PECS]),
    placeholder: 'Search',
    notFound: 'No Muscles Found',
    defaultValue: 'Select Muscle',
  },
  argTypes: {
  },
  decorators: [
    (Story) => <StoryBookDisplay story={<AppBlock className="py-20 w-60 max-w-full"><Story/></AppBlock>} />,
  ],

} satisfies Meta<typeof AppCombobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};

