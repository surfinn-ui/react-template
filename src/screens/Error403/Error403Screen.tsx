import { FC, useEffect, useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../models';
import {
  Error403ScreenView,
  IError403ScreenViewProps,
} from './Error403ScreenView';

const Error403Screen = observer(() => {
  // Pull in one of our MST stores
  const rootStore = useStores();
  // const { error403Store } = rootStore;

  const viewProps = useMemo<IError403ScreenViewProps>(
    () => ({
      title: 'Error403',
    }),
    [],
  );

  return <Error403ScreenView {...viewProps} />;
});

Error403Screen.displayName = 'Error403_Screen';

export default Error403Screen;
