import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../../src/frontend/common/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../../components/StoryBookDisplay/StoryBookDisplay';
import {StoryBookDisplayType} from '../../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {
  PostUpdatePagePresenter,
} from '../../../../../src/frontend/website/components/pages/posts/PostUpdatePage/components/PostUpdatePagePresenter';
import {StorybookDataUtils} from '../../../../utils/StorybookDataUtils/StorybookDataUtils';

const meta = {
  title: 'Pages/Entries/Post/Post Update Page',
  component: PostUpdatePagePresenter,
  tags: ['autodocs'],
  globals: {
  },
  args: {
    entry: StorybookDataUtils.getPostEntry(),
    onSave: () => {},
    errors: undefined,
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Post Update Page',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} column type={StoryBookDisplayType.Page} user={true}/>],
} satisfies Meta<typeof PostUpdatePagePresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
};
