import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';
export default {
  title: 'Material UI/Button',
  component: Button,
} as ComponentMeta<typeof Button>;
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  label: '프라이머리 버튼',
  color: 'primary',
  variant: 'contained',
  size: 'medium',
};

// design resources for storybook
Primary.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/YhjUf9UYbA1JyaAwWmI4sw/Basic-UI-Kit-(Community)?node-id=2%3A599&t=pEisgMOo13ahr7zV-1",
  },
};
