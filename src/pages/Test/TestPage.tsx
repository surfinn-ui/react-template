import { FC, useEffect, useCallback, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores";
import { 
  TestPageView, 
  ITestPageViewProps 
} from "./TestPage.view";

const TestPage = observer(() => {
  // Pull in one of our MST stores
  // const { testStore } = useStores();

  const viewProps = useMemo<ITestPageViewProps>(() => ({
    title: 'Test',
  }), []);

  return <TestPageView {...viewProps} />
})

TestPage.displayName = 'Test_Page';

export default TestPage;
