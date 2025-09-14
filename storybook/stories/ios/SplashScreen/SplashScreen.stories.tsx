import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../src/frontend/common/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {SplashScreen} from './SplashScreen';

const meta = {
  title: 'IOS/Splash',
  component: SplashScreen,
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
        component: 'Screen displayed while the app is loading',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} />],
} satisfies Meta<typeof SplashScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};

