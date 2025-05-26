import type {Meta, StoryObj} from '@storybook/react';
import {IoIosMail} from 'react-icons/io';
import {LiaAddressCard} from 'react-icons/lia';
import {PaletteName} from '../../../src/frontend/enums/PaletteName';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';

const meta = {
  title: 'Icons/Contacts',
  component: LiaAddressCard,
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
} satisfies Meta<typeof LiaAddressCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mail: Story = {

};

export const Address: Story = {
  render: () => <IoIosMail />,
};


