import { FC, useEffect, useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../models';
import {
  Error503ScreenView,
  IError503ScreenViewProps,
} from './Error503ScreenView';

const Error503Screen = observer(() => {
  // Pull in one of our MST stores
  const rootStore = useStores();
  // const { error503Store } = rootStore;

  const viewProps = useMemo<IError503ScreenViewProps>(
    () => ({
      title: 'Error503',
    }),
    [],
  );

  return <Error503ScreenView {...viewProps} />;
});

Error503Screen.displayName = 'Error503_Screen';

export default Error503Screen;
