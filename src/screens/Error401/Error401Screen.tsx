import { FC, useEffect, useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../models';
import {
  Error401ScreenView,
  IError401ScreenViewProps,
} from './Error401ScreenView';

const Error401Screen = observer(() => {
  // Pull in one of our MST stores
  const rootStore = useStores();
  // const { error401Store } = rootStore;

  const viewProps = useMemo<IError401ScreenViewProps>(
    () => ({
      title: 'Error401',
    }),
    [],
  );

  return <Error401ScreenView {...viewProps} />;
});

Error401Screen.displayName = 'Error401_Screen';

export default Error401Screen;
