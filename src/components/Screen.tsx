import { forwardRef, ReactNode } from 'react';
import { Helmet } from 'react-helmet';
// material
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

interface ScreenProps extends BoxProps {
  children: ReactNode;
  title?: string;
  header?: ReactNode;
}

export const Screen = forwardRef<HTMLDivElement, ScreenProps>(
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
