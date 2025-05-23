import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../frontend/components/atoms/StoryBookDisplay/StoryBookDisplay';
import {PaletteName} from '../../frontend/enums/PaletteName';
import {Header} from '../../frontend/components/layout/Header/Header';
import {AuthContext} from '../../frontend/components/layout/AuthProvider/AuthContext';
import {AuthContextValue} from '../../frontend/components/layout/AuthProvider/types/AuthContextValue';

const contextValue: AuthContextValue = {
  user: {
    id: 1,
    name: 'Alex Sarychev',
    email: 'test@email.com',
    jwt: 'something',
  },
  login: function(): void {
    throw new Error('Function not implemented.');
  },
  logout: function(): void {
    throw new Error('Function not implemented.');
  },
};
const meta = {
  title: 'Layout/Header',
  component: Header,
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
  decorators: [(Story) => <StoryBookDisplay story={Story} palette={PaletteName.Neutral} column />],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <Header/>,
};

export const WithLoggedInUser: Story = {
  render: () => <AuthContext.Provider value={contextValue} ><Header/></AuthContext.Provider>,
};
