import { SxProps, Theme } from '@mui/material';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Screen } from '../../components';

export interface IError401ScreenViewProps {
  title: string;
}

export const Error401ScreenView = observer(
  (props: IError401ScreenViewProps) => {
    return (
      <Screen title="Error401" sx={styles.screen}>
        <p>Error401 contents goes hear.</p>
      </Screen>
    );
  },
);

const styles: { [key: string]: SxProps<Theme> } = {
  screen: {
    flex: 1,
  },
};

Error401ScreenView.displayName = 'Error401_Screen_View';
