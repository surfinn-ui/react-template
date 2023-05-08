import { SxProps, Theme } from '@mui/material';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Screen } from '../../components';

export interface IError404ScreenViewProps {
  title: string;
}

export const Error404ScreenView = observer(
  (props: IError404ScreenViewProps) => {
    return (
      <Screen title="Error404" sx={styles.screen}>
        <p>Error404 contents goes hear.</p>
      </Screen>
    );
  },
);

const styles: { [key: string]: SxProps<Theme> } = {
  screen: {
    flex: 1,
  },
};

Error404ScreenView.displayName = 'Error404_Screen_View';
