import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/material-icons';
import '@mui/icons-material';

import { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import THEMES from '../src/themes';

export const parameters = {
  options: {
    storySort: {
      order: ['Introduction', 'Foundation', 'Components', 'Pages', 'Material UI', 'Example'],
      includeName: true,
    },
  },

  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'responsive',
    // defaultViewport: 'iphone12promax',
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const withMuiTheme = (Story, context) => {
  // The theme global we just declared
  const { theme: themeKey } = context.globals;

  // only recompute the theme if the themeKey changes
  const theme = useMemo(() => THEMES[themeKey] || THEMES['light'], [themeKey]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
};
export const decorators = [withMuiTheme];

export const globalTypes = {
  theme: {
    name: 'Theme',
    title: 'Mui Theme',
    description: 'Mui Theme for your components',
    defaultValue: 'dark',
    toolbar: {
      icon: 'paintbrush',
      dynamicTitle: true,
      items: [
        { value: 'light', left: '☀️', title: 'Light mode' },
        { value: 'dark', left: '🌙', title: 'Dark mode' },
      ],
    },
  },
};
