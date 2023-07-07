import { FC, useEffect, useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/models';
import { MainPageView, IMainPageViewProps } from './MainPageView';

const MainPage = observer(() => {
  // Pull in one of our MST stores
  const rootStore = useStores();
  // const { mainStore } = rootStore;

  const viewProps = useMemo<IMainPageViewProps>(
    () => ({
      title: 'Main',
    }),
    [],
  );

  return <MainPageView {...viewProps} />;
});

MainPage.displayName = 'Main_Page';

export default MainPage;
