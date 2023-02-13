import { FC, useEffect, useCallback, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores";
import { 
  MainPageView, 
  IMainPageViewProps 
} from "./MainPage.view";

const MainPage = observer(() => {
  // Pull in one of our MST stores
  // const { mainStore } = useStores();

  const viewProps = useMemo<IMainPageViewProps>(() => ({
    title: 'Main',
  }), []);

  return <MainPageView {...viewProps} />
})

MainPage.displayName = 'Main_Page';

export default MainPage;
