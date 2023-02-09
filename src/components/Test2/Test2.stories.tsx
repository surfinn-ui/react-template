import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Test2 } from './Test2';

export default {
  title: 'components/Test2',
  component: Test2,
} as ComponentMeta<typeof Test2>;

const Template: ComponentStory<typeof Test2> = (args) => (
  <Test2 {...args} />
);

export const Default = Template.bind({});

Default.args = {
  
};
