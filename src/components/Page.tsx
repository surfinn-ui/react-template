import { Box, BoxProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Helmet } from 'react-helmet';

export interface PageProps extends BoxProps {
  title: string;
}

/**
 * Describe your component here
 */
export const Page = observer(({ title, ...props }: PageProps) => {
  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={title} />
      </Helmet>

      <Box {...props}>
        <header>
          <h1>{title}</h1>
        </header>
        <main>{props.children}</main>
      </Box>
    </React.Fragment>
  );
});
