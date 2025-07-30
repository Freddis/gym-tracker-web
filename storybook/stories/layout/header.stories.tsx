import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../src/frontend/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';
import {Header} from '../../../src/frontend/components/layout/Header/Header';

const meta = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
  globals: {
    viewport: {value: 'tablet', isRotated: false},
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Login Form',
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
