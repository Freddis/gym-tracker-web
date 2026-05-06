import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';
import {BreadCrumbsBlock} from '../../../src/frontend/website/components/blocks/BreadCrumbsBlock/BreadCrumbsBlock';

const meta = {
  title: 'Components/BreadCrumbs',
  component: BreadCrumbsBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    breadCrumbs: [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Food',
        url: '/about',
      },
      {
        label: 'Create',
        url: '/create',
      },
    ],
  },
  argTypes: {
  },
  decorators: [
    (Story) => <StoryBookDisplay story={<Story/>} />,
  ],

} satisfies Meta<typeof BreadCrumbsBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};

