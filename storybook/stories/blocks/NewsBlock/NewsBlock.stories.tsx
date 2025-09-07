import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../src/frontend/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {NewsBlock} from '../../../../src/frontend/components/blocks/NewsBlock/NewsBlock';

const meta = {
  title: 'Blocks/News',
  component: NewsBlock,
  tags: ['autodocs'],
  args: {

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
