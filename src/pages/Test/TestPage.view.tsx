import { SxProps, Theme } from '@mui/material';
import { FC } from "react";
import { observer } from "mobx-react-lite";
import { Page } from "../../components";

export interface ITestPageViewProps {
  title: string;
}

export const TestPageView = observer((props: ITestPageViewProps) => {
  return (
    <Page title="Test" sx={styles.page}>
      <p>Test contents goes hear.</p>
    </Page>
  )
})

const styles: { [key: string]: SxProps<Theme> } = {
  page: {
    flex: 1,
  }
}

TestPageView.displayName = 'Test_Page_View';
