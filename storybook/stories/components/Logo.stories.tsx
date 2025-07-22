import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../src/frontend/enums/Color';
import {AppLogo} from '../../../src/frontend/components/atoms/AppLogo/AppLogo';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';

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
  args: {withText: true},
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Lightest} />],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Icon: Story = {
  args: {
    withText: false,
  },

};

export const IconAndText: Story = {
};
