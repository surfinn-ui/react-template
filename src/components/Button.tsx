import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';

/**
 * Primary UI component for user interaction
 */
export interface ButtonProps extends MuiButtonProps {
  /**
   * The content of the button.
   */
  label: string;
}

/**
 * Button component
 * @param param0 
 * @returns 
 */
export const Button = ({ label, ...rest }: ButtonProps) => (
  <MuiButton {...rest}>{label}</MuiButton>
);
