import type {Meta, StoryObj} from '@storybook/react';
import {PaletteName} from '../../../../src/frontend/enums/PaletteName';
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
        component: 'Workout Block',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={PaletteName.Neutral} className="max-w-5xl" column />],
} satisfies Meta<typeof NewsBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};
