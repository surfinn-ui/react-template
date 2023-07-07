import { SxProps, Theme } from '@mui/material';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Page } from '@/components';

export interface IPdfPageViewProps {
  title: string;
}

export const PdfPageView = observer((props: IPdfPageViewProps) => {
  return (
    <Page title="Pdf" sx={styles.page}>
      <p>Pdf contents goes hear.</p>
    </Page>
  );
});

const styles: { [key: string]: SxProps<Theme> } = {
  page: {
    flex: 1,
  },
};

PdfPageView.displayName = 'Pdf_Page_View';
