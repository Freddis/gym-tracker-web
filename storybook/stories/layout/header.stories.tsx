import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../src/frontend/common/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';
import {Header} from '../../../src/frontend/website/components/layout/Header/Header';

const meta = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
  globals: {
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Header for the website',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} column />],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <Header/>,
};

export const WithLoggedInUser: Story = {
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} column user/>],
};
