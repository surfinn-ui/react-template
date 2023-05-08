import { SxProps, Theme } from '@mui/material';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Screen } from '../../components';

export interface IDemoScreenViewProps {
  title: string;
}

export const DemoScreenView = observer((props: IDemoScreenViewProps) => {
  return (
    <Screen title="Demo" sx={styles.screen}>
      <p>Demo contents goes hear.</p>
    </Screen>
  );
});

const styles: { [key: string]: SxProps<Theme> } = {
  screen: {
    flex: 1,
  },
};

DemoScreenView.displayName = 'Demo_Screen_View';
