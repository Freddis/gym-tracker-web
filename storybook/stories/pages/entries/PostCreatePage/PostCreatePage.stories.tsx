import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../../src/frontend/common/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../../components/StoryBookDisplay/StoryBookDisplay';
import {StoryBookDisplayType} from '../../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {PostCreatePage} from '../../../../../src/frontend/website/components/pages/posts/PostCreatePage/PostCreatePage';

const meta = {
  title: 'Pages/Entries/Post/Post Create Page',
  component: PostCreatePage,
  tags: ['autodocs'],
  globals: {
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Post Create Page',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} column type={StoryBookDisplayType.Page} user={true}/>],
} satisfies Meta<typeof PostCreatePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
};
