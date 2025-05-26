import type {Meta, StoryObj} from '@storybook/react';
import {FaFacebook, FaGoogle, FaVk} from 'react-icons/fa';
import {PaletteName} from '../../../src/frontend/enums/PaletteName';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';

const meta = {
  title: 'Icons/Dark Mode',
  component: FaFacebook,
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
} satisfies Meta<typeof FaFacebook>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Facebook: Story = {

};

export const Google: Story = {
  render: () => <FaGoogle />,
};

export const Vkontakte: Story = {
  render: () => <FaVk />,
};


