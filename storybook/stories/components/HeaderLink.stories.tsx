import type {Meta, StoryObj} from '@storybook/react';
import {HeaderLink} from '../../../src/frontend/components/layout/Header/components/HeaderLink';
import {PaletteName} from '../../../src/frontend/enums/PaletteName';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';


const meta = {
  title: 'Components/HeaderLink',
  component: HeaderLink,
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
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={PaletteName.Lightest} />],
} satisfies Meta<typeof HeaderLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {
  render: () => <HeaderLink>Click Me</HeaderLink>,
};
