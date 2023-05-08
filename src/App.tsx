import { useMemo, useState } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import THEMES from './themes';

import {
  IRootStore,
  RootStoreProvider,
  setupRootStore,
  useInitialRootStore,
} from './models';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';

type TThemeMode = keyof typeof THEMES;

function App() {
  const [themeMode, setThemeMode] = useState<TThemeMode>('light');

  // only recompute the theme if the themeKey changes
  const theme = useMemo(
    () => THEMES[themeMode] || THEMES['light'],
    [themeMode],
  );

  const { rootStore, rehydrated } = useInitialRootStore(() => {
    // hide the splash screen
    console.log('rehydrated, rootStore:', JSON.stringify(rootStore, null, 2));
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!rehydrated ? <div>Loading...</div> : <Router />}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
