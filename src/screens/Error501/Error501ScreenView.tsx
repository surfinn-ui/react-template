import { SxProps, Theme } from '@mui/material';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Screen } from '../../components';

export interface IError501ScreenViewProps {
  title: string;
}

export const Error501ScreenView = observer(
  (props: IError501ScreenViewProps) => {
    return (
      <Screen title="Error501" sx={styles.screen}>
        <p>Error501 contents goes hear.</p>
      </Screen>
    );
  },
);

const styles: { [key: string]: SxProps<Theme> } = {
  screen: {
    flex: 1,
  },
};

Error501ScreenView.displayName = 'Error501_Screen_View';
