import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../../components/StoryBookDisplay/StoryBookDisplay';
import {StoryBookDisplayType} from '../../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {ExerciseSelectionPopup} from '../../../../../src/frontend/website/components/blocks/ExerciseSelectionPopup/ExerciseSelectionPopup';

const meta = {
  title: 'Blocks/Popups/ExerciseSelectionPopup',
  component: ExerciseSelectionPopup,
  tags: ['autodocs'],
  globals: {
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: "Allows to select an exercise from the built-in or the user's library. Used to reference exercises in forms.",
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} column user type={StoryBookDisplayType.Popup}/>],
} satisfies Meta<typeof ExerciseSelectionPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
};
