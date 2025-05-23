import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../frontend/components/atoms/StoryBookDisplay/StoryBookDisplay';
import {PaletteName} from '../../frontend/enums/PaletteName';
import {AppLogo} from '../../frontend/components/atoms/AppLogo/AppLogo'; ;

const meta: Meta<typeof AppLogo> = {
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Icon: Story = {
  render: () => <AppLogo/>,
};

export const IconAndText: Story = {
  render: () => <><AppLogo/><span className=" uppercase font-bold text-xl -ml-2">Discipline</span></>,
};
