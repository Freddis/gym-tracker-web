import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../../src/frontend/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../../components/StoryBookDisplay/StoryBookDisplay';
import {SettingsScreen} from './SettingsScreen';

const meta = {
  title: 'IOS/Settings/Settings',
  component: SettingsScreen,
  tags: ['autodocs'],
  globals: {
    viewport: {value: 'tablet', isRotated: false},
  },
  args: {
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Settings tab in the mobile app',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} />],
} satisfies Meta<typeof SettingsScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};

