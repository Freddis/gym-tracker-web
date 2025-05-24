import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../frontend/components/atoms/StoryBookDisplay/StoryBookDisplay';
import {PaletteName} from '../../frontend/enums/PaletteName';
import {FaSun, FaMoon} from 'react-icons/fa';

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


