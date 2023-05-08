import { SxProps, Theme } from '@mui/material';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Screen } from '../../components';

export interface IError503ScreenViewProps {
  title: string;
}

export const Error503ScreenView = observer(
  (props: IError503ScreenViewProps) => {
    return (
      <Screen title="Error503" sx={styles.screen}>
        <p>Error503 contents goes hear.</p>
      </Screen>
    );
  },
);

const styles: { [key: string]: SxProps<Theme> } = {
  screen: {
    flex: 1,
  },
};

Error503ScreenView.displayName = 'Error503_Screen_View';
