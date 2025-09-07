
import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../../src/frontend/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../../components/StoryBookDisplay/StoryBookDisplay';
import {PasswordRestoreScreen} from './PasswordRestoreScreen';


const meta = {
  title: 'IOS/Auth/Password Restore',
  component: PasswordRestoreScreen,
  tags: ['autodocs'],
  globals: {
    viewport: {value: 'tablet', isRotated: false},
  },
  args: {
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Password Restore Screen',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} />],
} satisfies Meta<typeof PasswordRestoreScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};

export const Errors: Story = {
  args: {
    errors: [
      {
        field: 'email',
        message: 'Not a valid email',
      },
    ],
  },
};

