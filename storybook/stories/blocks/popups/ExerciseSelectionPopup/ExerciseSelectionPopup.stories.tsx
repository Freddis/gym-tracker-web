import type {Meta, StoryObj} from '@storybook/react';
import {ExerciseSelectionPopup} from '../../../../../src/frontend/components/atoms/ExerciseSelectionPopup/ExerciseSelectionPopup';
import {StoryBookDisplay} from '../../../../components/StoryBookDisplay/StoryBookDisplay';
import {StoryBookDisplayType} from '../../../../components/StoryBookDisplay/enums/StoryBookDisplayType';

const meta = {
  title: 'Blocks/Popups/ExerciseSelectionPopup',
  component: ExerciseSelectionPopup,
  tags: ['autodocs'],
  globals: {
    viewport: {value: 'tablet', isRotated: false},
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Registration Form',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} column user type={StoryBookDisplayType.Popup}/>],
} satisfies Meta<typeof ExerciseSelectionPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
};
