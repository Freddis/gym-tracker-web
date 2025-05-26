import type {Meta, StoryObj} from '@storybook/react';
import {FaSun, FaMoon} from 'react-icons/fa';
import {PaletteName} from '../../../src/frontend/enums/PaletteName';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';

const meta = {
  title: 'Icons/Social',
  component: FaSun,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Icons used in the application',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={Story} palette={PaletteName.Lightest} />],
} satisfies Meta<typeof FaSun>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sun: Story = {

};

export const Moon: Story = {
  render: () => <FaMoon />,
};


