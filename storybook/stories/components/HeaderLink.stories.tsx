import type {Meta, StoryObj} from '@storybook/react';
import {HeaderLink} from '../../../src/frontend/components/layout/Header/components/HeaderLink';
import {Color} from '../../../src/frontend/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';
import {route, RouteId} from '../../../src/frontend/utils/route';

const meta = {
  title: 'Components/HeaderLink',
  component: HeaderLink,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A link used the header menu',
      },
    },
  },
  args: {children: 'Button'},
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Lightest} />],
} satisfies Meta<typeof HeaderLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {
  render: () => <HeaderLink to={route(RouteId.Home)}>Click Me</HeaderLink>,
};
