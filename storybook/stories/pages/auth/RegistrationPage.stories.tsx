import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {RegistrationPage} from '../../../../src/frontend/components/pages/Auth/RegistationPage/RegistrationPage';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';

const meta = {
  title: 'Pages/Auth/RegistrationPage',
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
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} column type={StoryBookDisplayType.Page} />],
} satisfies Meta<typeof RegistrationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <RegistrationPage/>,
};
