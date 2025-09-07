import type {Meta, StoryObj} from '@storybook/react';
import {FaSun, FaMoon} from 'react-icons/fa';
import {Color} from '../../../src/frontend/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';

const meta = {
  title: 'Icons/Dark Mode',
  component: FaSun,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Icons used in dark mode swithes',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Lightest} />],
} satisfies Meta<typeof FaSun>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sun: Story = {

};

export const Moon: Story = {
  render: () => <FaMoon />,
};


