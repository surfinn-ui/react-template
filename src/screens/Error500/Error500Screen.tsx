import { FC, useEffect, useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../models';
import {
  Error500ScreenView,
  IError500ScreenViewProps,
} from './Error500ScreenView';

const Error500Screen = observer(() => {
  // Pull in one of our MST stores
  const rootStore = useStores();
  // const { error500Store } = rootStore;

  const viewProps = useMemo<IError500ScreenViewProps>(
    () => ({
      title: 'Error500',
    }),
    [],
  );

  return <Error500ScreenView {...viewProps} />;
});

Error500Screen.displayName = 'Error500_Screen';

export default Error500Screen;
