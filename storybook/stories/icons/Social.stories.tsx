import type {Meta, StoryObj} from '@storybook/react';
import {FaFacebook, FaGoogle, FaVk} from 'react-icons/fa';
import {Color} from '../../../src/frontend/common/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';

const meta = {
  title: 'Icons/Social',
  component: FaFacebook,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Icons used for the social networks',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Lightest} />],
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


