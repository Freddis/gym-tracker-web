import type {Meta, StoryObj} from '@storybook/react';
import {PaletteName} from '../../../../src/frontend/enums/PaletteName';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {LoginPage} from '../../../../src/frontend/components/pages/Auth/LoginPage/LoginPage';

const meta = {
  title: 'Pages/Auth/LoginPage',
  component: LoginPage,
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
  decorators: [(Story) => <StoryBookDisplay story={Story} palette={PaletteName.Neutral} column page />],
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <LoginPage/>,
};
