import { FC, useEffect, useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../models';
import {
  Error404ScreenView,
  IError404ScreenViewProps,
} from './Error404ScreenView';

const Error404Screen = observer(() => {
  // Pull in one of our MST stores
  const rootStore = useStores();
  // const { error404Store } = rootStore;

  const viewProps = useMemo<IError404ScreenViewProps>(
    () => ({
      title: 'Error404',
    }),
    [],
  );

  return <Error404ScreenView {...viewProps} />;
});

Error404Screen.displayName = 'Error404_Screen';

export default Error404Screen;
