import { SxProps, Theme } from '@mui/material';
import { FC } from "react";
import { observer } from "mobx-react-lite";
import { Page } from "../../components";

export interface IDemoPageViewProps {
  title: string;
}

export const DemoPageView = observer((props: IDemoPageViewProps) => {
  return (
    <Page title="Demo" sx={styles.page}>
      <p>Demo contents goes hear.</p>
    </Page>
  )
})

const styles: { [key: string]: SxProps<Theme> } = {
  page: {
    flex: 1,
  }
}

DemoPageView.displayName = 'Demo_Page_View';
