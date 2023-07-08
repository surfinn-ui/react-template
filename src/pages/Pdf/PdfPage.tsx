import { FC, useEffect, useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/models';
import { PdfPageView, IPdfPageViewProps } from './PdfPageView';

const PdfPage = observer(() => {
  // Pull in one of our MST stores
  const rootStore = useStores();
  // const { pdfStore } = rootStore;

  const viewProps = useMemo<IPdfPageViewProps>(
    () => ({
      title: 'Pdf',
    }),
    [],
  );

  return <PdfPageView {...viewProps} />;
});

PdfPage.displayName = 'Pdf_Page';

export default PdfPage;
