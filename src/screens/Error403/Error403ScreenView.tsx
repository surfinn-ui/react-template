import { SxProps, Theme } from '@mui/material';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Screen } from '../../components';

export interface IError403ScreenViewProps {
  title: string;
}

export const Error403ScreenView = observer(
  (props: IError403ScreenViewProps) => {
    return (
      <Screen title="Error403" sx={styles.screen}>
        <p>Error403 contents goes hear.</p>
      </Screen>
    );
  },
);

const styles: { [key: string]: SxProps<Theme> } = {
  screen: {
    flex: 1,
  },
};

Error403ScreenView.displayName = 'Error403_Screen_View';
