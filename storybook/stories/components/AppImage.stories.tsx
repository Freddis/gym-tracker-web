import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../src/frontend/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';
import {AppImage} from '../../../src/frontend/components/atoms/AppImage/AppImage';
import {StorybookDataUtils} from '../../utils/StorybookDataUtils';

const meta = {
  title: 'Components/Image',
  component: AppImage,
  tags: ['autodocs'],
  args: {
    src: StorybookDataUtils.getImage(),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Image',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Lightest} />],
} satisfies Meta<typeof AppImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {
};

