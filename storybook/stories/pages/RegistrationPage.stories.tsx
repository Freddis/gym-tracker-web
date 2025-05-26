import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';
import {PaletteName} from '../../../src/frontend/enums/PaletteName';
import {RegistrationPage} from '../../../src/frontend/components/pages/Auth/RegistationPage/RegistrationPage';

const meta = {
  title: 'Pages/RegistrationPage',
  component: RegistrationPage,
  tags: ['autodocs'],
  globals: {
    viewport: {value: 'tablet', isRotated: false},
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Registration Form',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={Story} palette={PaletteName.Neutral} column />],
} satisfies Meta<typeof RegistrationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <RegistrationPage/>,
};
