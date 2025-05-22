import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../frontend/components/atoms/StoryBookDisplay/StoryBookDisplay';
import {PaletteName} from '../frontend/enums/PaletteName';
import {AppLogo} from '../frontend/components/atoms/AppLogo/AppLogo'; ;

const meta = {
  title: 'Components/Logo',
  component: AppLogo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Basic text link for redirects',
      },
    },
  },
  args: {children: 'Button'},
  decorators: [(Story) => <StoryBookDisplay story={Story} palette={PaletteName.Lightest} />],
} satisfies Meta<typeof AppLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {
  render: () => <AppLogo/>,
};
