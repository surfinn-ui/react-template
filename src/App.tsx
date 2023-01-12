import { useMemo, useState } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import THEMES from './themes';
type ThemeKey = keyof typeof THEMES;

function App() {
  const [themeKey, setThemeKey] = useState<ThemeKey>('light');

  // only recompute the theme if the themeKey changes
  const theme = useMemo(() => THEMES[themeKey] || THEMES['light'], [themeKey]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box>
        <Button variant='contained'>Hello World</Button>
        <Button variant='contained'>한글 버튼</Button>
      </Box>
    </ThemeProvider>
  );
}

export default App;
