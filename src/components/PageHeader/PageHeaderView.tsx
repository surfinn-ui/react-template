import { Box, BoxProps, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';

export interface IPageHeaderViewProps {
  title: string;
  onBack: () => void;
}

/**
 * Describe your component here
 */
export const PageHeaderView = observer(
  ({ onBack, ...props }: IPageHeaderViewProps) => {
    return (
      <Box>
        {props.title}
        PageHeaderView
      </Box>
    );
  },
);

PageHeaderView.displayName = 'PageHeader_Component_View';


function Shadow({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        maxWidth: theme.breakpoints.values.xl,
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
