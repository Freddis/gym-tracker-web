import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../src/frontend/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';
import {Footer} from '../../../src/frontend/components/layout/Footer/Footer';

const meta = {
  title: 'Layout/Footer',
  component: Footer,
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
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <Footer/>,
};

