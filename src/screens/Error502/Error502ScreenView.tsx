import { SxProps, Theme } from '@mui/material';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Screen } from '../../components';

export interface IError502ScreenViewProps {
  title: string;
}

export const Error502ScreenView = observer(
  (props: IError502ScreenViewProps) => {
    return (
      <Screen title="Error502" sx={styles.screen}>
        <p>Error502 contents goes hear.</p>
      </Screen>
    );
  },
);

const styles: { [key: string]: SxProps<Theme> } = {
  screen: {
    flex: 1,
  },
};

Error502ScreenView.displayName = 'Error502_Screen_View';
