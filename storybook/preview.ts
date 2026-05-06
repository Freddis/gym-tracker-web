import type {Preview} from '@storybook/react';
import '../src/frontend/common/utils/css/app.css';
import {themes} from '@storybook/theming';


const preview: Preview = {
  parameters: {
    options: {
      // storybook is very bad with sorting stories, typescript isn't working here
      //@ts-expect-error storySort is not typed https://github.com/storybookjs/storybook/issues/22779
      storySort: (a, b) => {
        const ORDER = ['Colors', 'Icons', 'Components', 'Blocks', 'Pages', 'IOS'];
        const catA = a.title?.split('/')[0] ?? '';
        const catB = b.title?.split('/')[0] ?? '';
        const orderA = ORDER.indexOf(catA) === -1 ? Number.MAX_SAFE_INTEGER : ORDER.indexOf(catA);
        const orderB = ORDER.indexOf(catB) === -1 ? Number.MAX_SAFE_INTEGER : ORDER.indexOf(catB);
        // 1. sort by category order
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        // 2. fallback: alphabetical by id (numeric aware)
        return a.id === b.id ? 0 : a.id.localeCompare(b.id, undefined, {numeric: true});
      },
    },
    docs: {
      theme: themes.dark,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
