import { FC, useEffect, useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../models';
import {
  Error402ScreenView,
  IError402ScreenViewProps,
} from './Error402ScreenView';

const Error402Screen = observer(() => {
  // Pull in one of our MST stores
  const rootStore = useStores();
  // const { error402Store } = rootStore;

  const viewProps = useMemo<IError402ScreenViewProps>(
    () => ({
      title: 'Error402',
    }),
    [],
  );

  return <Error402ScreenView {...viewProps} />;
});

Error402Screen.displayName = 'Error402_Screen';

export default Error402Screen;
