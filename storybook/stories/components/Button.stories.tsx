import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';
import {AppButton} from '../../../src/frontend/components/atoms/AppButton/AppButton';
import {Color} from '../../../src/frontend/enums/Color';

const meta = {
  title: 'Components/Button',
  component: AppButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Button',
    palette: Color.Accent,
  },
  argTypes: {
    palette: {
      type: {
        name: 'enum',
        value: Object.values(Color),
      },
    },
  },
  decorators: [
    (Story) => <StoryBookDisplay palette={Color.Darkest} story={<Story/>} />,
  ],

} satisfies Meta<typeof AppButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {
  render: (args) => <AppButton>{args.children}</AppButton>,
};

export const Neutral: Story = {
  args: {
    palette: Color.Neutral,
  },
  decorators: [
    (Story) => <div className="palette-neutral"><Story/></div>,
  ],
};

export const Large: Story = {
  args: {
    variant: 'lg',
  },
};
