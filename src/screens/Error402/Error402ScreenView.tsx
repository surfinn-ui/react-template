import { SxProps, Theme } from '@mui/material';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Screen } from '../../components';

export interface IError402ScreenViewProps {
  title: string;
}

export const Error402ScreenView = observer(
  (props: IError402ScreenViewProps) => {
    return (
      <Screen title="Error402" sx={styles.screen}>
        <p>Error402 contents goes hear.</p>
      </Screen>
    );
  },
);

const styles: { [key: string]: SxProps<Theme> } = {
  screen: {
    flex: 1,
  },
};

Error402ScreenView.displayName = 'Error402_Screen_View';
