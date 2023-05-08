import { SxProps, Theme } from '@mui/material';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Screen } from '../../components';

export interface IError500ScreenViewProps {
  title: string;
}

export const Error500ScreenView = observer(
  (props: IError500ScreenViewProps) => {
    return (
      <Screen title="Error500" sx={styles.screen}>
        <p>Error500 contents goes hear.</p>
      </Screen>
    );
  },
);

const styles: { [key: string]: SxProps<Theme> } = {
  screen: {
    flex: 1,
  },
};

Error500ScreenView.displayName = 'Error500_Screen_View';
