import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';
import {AppTagList} from '../../../src/frontend/common/components/atoms/AppTagList/AppTagList';
import {Muscle} from '../../../src/frontend/common/utils/openapi-client';
import {AppBlock} from '../../../src/frontend/common/components/atoms/AppBlock/AppBlock';
import {createTagValues} from '../../../src/frontend/common/components/atoms/AppTagList/utils/createTagValues';

const meta = {
  title: 'Components/TagList',
  component: AppTagList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    className: 'w-full',
    values: createTagValues(Muscle),
    selected: createTagValues([Muscle.PECS]),
    placeholder: 'Search',
    notFound: 'No Muscles Found',
    defaultValue: 'Select Muscle',
    onSelect: () => {},
  },
  argTypes: {
  },
  decorators: [
    (Story) => <StoryBookDisplay story={<AppBlock className="py-20 w-100 max-w-full"><Story/></AppBlock>} />,
  ],

} satisfies Meta<typeof AppTagList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};
