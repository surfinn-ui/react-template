if (process.env.NODE_ENV === 'development') {
  import('./devtools/ReactotronConfig.js');
}
import { useMemo, useState } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import mstLogo from './assets/mst.svg';
import muiLogo from './assets/mui.svg';
import reactLogo from './assets/react.svg';
import storybookLogo from './assets/storybook.svg';

import './App.css';

import THEMES from './themes';

import { useInitialRootStore } from './models';
import Reactotron from 'reactotron-react-js';

type TThemeMode = keyof typeof THEMES;

function App() {
  const [themeMode, setThemeMode] = useState<TThemeMode>('light');

  // only recompute the theme if the themeKey changes
  const theme = useMemo(
    () => THEMES[themeMode] || THEMES['light'],
    [themeMode],
  );

  const { rehydrated } = useInitialRootStore(() => {
    // hide the splash screen
    
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!rehydrated ? <div>Loading...</div> : <AppView />}
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
      </div>
      <div>
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
          <img src="/ignite.png" className="logo" alt="Ignite logo" />
        </a>
        <a href="https://www.openapis.org/" target="_blank">
          <img
            src="/OpenAPI_Logo_Pantone-1.png"
            className="logo"
            alt="OpenAPI logo"
          />
        </a>
      </div>

      <h1>Vite + React</h1>
      <ul style={{ textAlign: 'left' }}>
        <li>MobX-state-tree</li>
        <li>Material UI</li>
        <li>Storybook</li>
        <li>Ignite-cli Generator</li>
        <li>OpenAPI</li>
        <li>mobx-devtools-mst</li>
        <li>Reactotron</li>
        <li>OpenAPI</li>
      </ul>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">Click on the logos to learn more</p>
    </div>
  );
};
