import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../../src/frontend/common/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../../components/StoryBookDisplay/StoryBookDisplay';
import {WeightCreatePage} from '../../../../../src/frontend/website/components/pages/Weight/WeightCreatePage/WeightCreatePage';
import {StoryBookDisplayType} from '../../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {
  ImageUpdatePagePresenter,
} from '../../../../../src/frontend/website/components/pages/images/ImageUpdatePage/components/ImageUpdatePagePresenter';
import {StorybookDataUtils} from '../../../../utils/StorybookDataUtils/StorybookDataUtils';

const meta = {
  title: 'Pages/Entries/Image/Image Update Page',
  component: ImageUpdatePagePresenter,
  tags: ['autodocs'],
  globals: {
  },
  args: {
    image: StorybookDataUtils.getImageEntry(),
    onSave: () => {},
    errors: undefined,
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Image Update Page',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} column type={StoryBookDisplayType.Page} user={true}/>],
} satisfies Meta<typeof WeightCreatePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
};
