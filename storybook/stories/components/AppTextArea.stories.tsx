import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../components/StoryBookDisplay/StoryBookDisplay';
import {AppTextArea} from '../../../src/frontend/common/components/atoms/AppTextArea/AppTextArea';
import {StoryBookDisplayType} from '../../components/StoryBookDisplay/enums/StoryBookDisplayType';

const meta = {
  title: 'Components/TextArea',
  component: AppTextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    className: 'min-w-100 h-30',
    // eslint-disable-next-line max-len
    children: 'Lower the barbell towards your lower chest as you keep your elbows close to your body. The barbell should slightly Touch your chest at the end of the movement.',

  },
  argTypes: {
  },
  decorators: [
    (Story) => <StoryBookDisplay type={StoryBookDisplayType.Component} story={<Story/>} />,
  ],

} satisfies Meta<typeof AppTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};
