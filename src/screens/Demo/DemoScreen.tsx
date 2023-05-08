import { FC, useEffect, useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../models';
import { DemoScreenView, IDemoScreenViewProps } from './DemoScreenView';

const DemoScreen = observer(() => {
  // Pull in one of our MST stores
  const rootStore = useStores();
  // const { demoStore } = rootStore;

  const viewProps = useMemo<IDemoScreenViewProps>(
    () => ({
      title: 'Demo',
    }),
    [],
  );

  return <DemoScreenView {...viewProps} />;
});

DemoScreen.displayName = 'Demo_Screen';

export default DemoScreen;
