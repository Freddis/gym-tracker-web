import type {Preview} from '@storybook/react';
import '../src/frontend/css/app.css';
import {themes} from '@storybook/theming';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Colors', 'Icons', 'Components', 'Blocks', 'Pages'],
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
