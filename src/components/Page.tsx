import { Helmet } from 'react-helmet';
import { forwardRef, ReactNode } from 'react';
// material
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

interface PageProps extends BoxProps {
  children: ReactNode;
  title?: string;
  header?: ReactNode;
}

export const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ children, title = '', header, ...other }, ref) => (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Box ref={ref} {...other}>
        {header}
        {children}
      </Box>
    </>
  ),
);
