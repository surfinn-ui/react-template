import { FC, useEffect, useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../models';
import {
  Error501ScreenView,
  IError501ScreenViewProps,
} from './Error501ScreenView';

const Error501Screen = observer(() => {
  // Pull in one of our MST stores
  const rootStore = useStores();
  // const { error501Store } = rootStore;

  const viewProps = useMemo<IError501ScreenViewProps>(
    () => ({
      title: 'Error501',
    }),
    [],
  );

  return <Error501ScreenView {...viewProps} />;
});

Error501Screen.displayName = 'Error501_Screen';

export default Error501Screen;
