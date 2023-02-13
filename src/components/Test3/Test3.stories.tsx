import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Test3 } from './Test3';

export default {
  title: 'components/Test3',
  component: Test3,
} as ComponentMeta<typeof Test3>;

const Template: ComponentStory<typeof Test3> = (args) => (
  <Test3 {...args} />
);

export const Default = Template.bind({});

Default.args = {
  
};
