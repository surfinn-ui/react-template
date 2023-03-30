import { FC, useEffect, useCallback, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../models";
import { 
  DemoPageView, 
  IDemoPageViewProps 
} from "./DemoPageView";

const DemoPage = observer(() => {
  // Pull in one of our MST stores
  const rootStore = useStores();
  // const { demoStore } = rootStore;
  
  const viewProps = useMemo<IDemoPageViewProps>(() => ({
    title: 'Demo',
  }), []);

  return <DemoPageView {...viewProps} />
})

DemoPage.displayName = 'Demo_Page';

export default DemoPage;
