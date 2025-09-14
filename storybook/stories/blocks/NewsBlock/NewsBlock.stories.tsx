import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../src/frontend/common/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {NewsBlock} from '../../../../src/frontend/website/components/blocks/NewsBlock/NewsBlock';
import {StorybookDataUtils} from '../../../utils/StorybookDataUtils/StorybookDataUtils';

const meta = {
  title: 'Blocks/News',
  component: NewsBlock,
  tags: ['autodocs'],
  args: {
    news: {
      title: 'Gained 10 pounds in 3 months',
      short: `10lbs of muscle after 50 is doable but to achieve it 
              in a year will require a lot of hard work and discipline. 
              My strategy will be to consult ...`,
    },
    user: {
      ...StorybookDataUtils.getUser(),
      profilePicture: '',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'News Block',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} className="max-w-5xl" />],
} satisfies Meta<typeof NewsBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};


export const OwnNews: Story = {
  args: {
    own: true,
  },
};
