import { useEffect, useMemo, useState } from 'react';

import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import reactLogo from './assets/react.svg';
import muiLogo from './assets/mui.svg';
import mstLogo from './assets/mst.svg';
import storybookLogo from './assets/storybook.svg';

import './App.css';

import THEMES from './themes';
import {
  IRootStore,
  RootStoreProvider,
  setupRootStore,
  useInitialRootStore,
} from './models';

type ThemeKey = keyof typeof THEMES;

function App() {
  const [themeKey, setThemeKey] = useState<ThemeKey>('light');

  // only recompute the theme if the themeKey changes
  const theme = useMemo(() => THEMES[themeKey] || THEMES['light'], [themeKey]);

  const { rehydrated } = useInitialRootStore(() => {
    // hide the splash screen
  });

  if (!rehydrated) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppView />
    </ThemeProvider>
  );
}

export default App;

const AppView = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://mobx-state-tree.js.org/" target="_blank">
          <img src={mstLogo} className="logo" alt="MobX-state-tree logo" />
        </a>
        <a href="https://mui.org" target="_blank">
          <img src={muiLogo} className="logo" alt="Material UI logo" />
        </a>
        <a href="https://storybook.js.org/" target="_blank">
          <img src={storybookLogo} className="logo" alt="Storybook logo" />
        </a>
        <a href="https://github.com/infinitered/ignite" target="_blank">
          <img src="/ignite.jpg" className="logo" alt="Ignite logo" />
        </a>
        <a href="https://www.openapis.org/" target="_blank">
          <img
            src="/OpenAPI_Logo_Pantone-1.png"
            className="logo"
            alt="OpenAPI logo"
          />
        </a>
      </div>
      <h1>
        Vite + React + MobX-state-tree + Material UI + Storybook + Ignite-cli +
        OpenAPI
      </h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};
