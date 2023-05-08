import { FC, useEffect, useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../models';
import {
  Error502ScreenView,
  IError502ScreenViewProps,
} from './Error502ScreenView';

const Error502Screen = observer(() => {
  // Pull in one of our MST stores
  const rootStore = useStores();
  // const { error502Store } = rootStore;

  const viewProps = useMemo<IError502ScreenViewProps>(
    () => ({
      title: 'Error502',
    }),
    [],
  );

  return <Error502ScreenView {...viewProps} />;
});

Error502Screen.displayName = 'Error502_Screen';

export default Error502Screen;
