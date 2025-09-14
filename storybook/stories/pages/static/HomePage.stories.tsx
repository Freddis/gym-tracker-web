import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {HomePage} from '../../../../src/frontend/website/components/pages/Home/HomPage';
import {Color} from '../../../../src/frontend/common/utils/design-system/types/Color';

const meta = {
  title: 'Pages/Static/Home',
  component: HomePage,
  tags: ['autodocs'],
  globals: {
  },
  args: {

  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The front page of the website',
      },
    },
  },
  decorators: [
    (Story) => <StoryBookDisplay story={<Story/>} column type={StoryBookDisplayType.Page}/>,
  ],
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};


export const Variation1: Story = {
  args: {
    palettes: {
      iphoneShowcase: Color.Darkest,
      laptopShowcase: Color.Neutral,
      pricing: Color.Lightest,
      download: Color.Darkest,
    },
  },
};

export const Variation2: Story = {
  args: {
    palettes: {
      iphoneShowcase: Color.Neutral,
      laptopShowcase: Color.Lightest,
      pricing: Color.Neutral,
      download: Color.Lightest,
    },
  },
};
