import { useEffect, useMemo, useState } from 'react';

import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import THEMES from './themes';
import {
  IRootStore,
  RootStoreProvider,
  setupRootStore,
  useInitialRootStore,
} from './stores';

type ThemeKey = keyof typeof THEMES;

function App() {
  const [themeKey, setThemeKey] = useState<ThemeKey>('light');

  // only recompute the theme if the themeKey changes
  const theme = useMemo(() => THEMES[themeKey] || THEMES['light'], [themeKey]);

  const { rehydrated } = useInitialRootStore(() => {
    console.log('useInitialRootStore()');
    // hide the splash screen
    
  });


  if (!rehydrated) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Button variant="contained">Hello World</Button>
        <Button variant="contained">한글 버튼</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
