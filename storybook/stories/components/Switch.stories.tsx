
import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../src/frontend/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';
import {AppSwitch} from '../../../src/frontend/components/atoms/AppSwitch/AppSwitch';

const meta = {
  title: 'Components/Switch',
  component: AppSwitch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Boolean switch for things like dark mode',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Lightest} />],
} satisfies Meta<typeof AppSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {
};

export const WithLabel: Story = {
  render: () => <AppSwitch label="Click on label and switch will go off"/>,
};
