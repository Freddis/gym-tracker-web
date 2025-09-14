import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {ArticlePage} from '../../../../src/frontend/website/components/pages/ArticlePage/ArticlePage';
import {Article} from '../../../../src/frontend/website/components/pages/ArticlePage/types/Article';

const meta = {
  title: 'Pages/Static/Articles',
  component: ArticlePage,
  tags: ['autodocs'],
  globals: {
  },
  args: {
    article: Article.TermsOfService,
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Page that displays articles. Specifically legal articles like the terms or service and the privacy policy',
      },
    },
  },
  decorators: [
    (Story) => <StoryBookDisplay story={<Story/>} column type={StoryBookDisplayType.Page}/>,
  ],
} satisfies Meta<typeof ArticlePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};
