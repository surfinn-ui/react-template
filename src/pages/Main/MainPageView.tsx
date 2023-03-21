import { SxProps, Theme } from '@mui/material';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Page } from '../../components';

export interface IMainPageViewProps {
  title: string;
}

export const MainPageView = observer((props: IMainPageViewProps) => {
  return (
    <Page title="Main" sx={styles.page}>
      <p>Main contents goes hear.</p>
    </Page>
  );
});

const styles: { [key: string]: SxProps<Theme> } = {
  page: {
    flex: 1,
  },
};

MainPageView.displayName = 'Main_Page_View';
