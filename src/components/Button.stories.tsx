import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button, ButtonProps } from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Material UI/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['text', 'outlined', 'contained', undefined],
      },
    },
    color: {
      control: {
        type: 'select',
        options: [
          'inherit',
          'primary',
          'secondary',
          'success',
          'error',
          'info',
          'warning',
          undefined,
        ],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large', undefined],
      },
    },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args: ButtonProps) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label: '프라이머리 버튼',
  color: 'primary',
  variant: 'contained',
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
  label: '세컨더리 버튼',
  variant: 'contained',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: '큰 버튼',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: '작은 버튼',
};
