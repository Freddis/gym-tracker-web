
import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../../src/frontend/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../../components/StoryBookDisplay/StoryBookDisplay';
import {LoginScreen} from './LoginScreen';


const meta = {
  title: 'IOS/Auth/Login',
  component: LoginScreen,
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
        component: 'Login Screen',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} />],
} satisfies Meta<typeof LoginScreen>;

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
      {
        field: 'password',
        message: 'Password cannot be empty',
      },
    ],
  },
};

