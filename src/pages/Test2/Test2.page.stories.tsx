import { ComponentStory, ComponentMeta } from '@storybook/react';
import Test2Page from './Test2.page';

export default {
  title: 'pages/Test2Page',
  component: Test2Page,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Test2Page>;

const Template: ComponentStory<typeof Test2Page> = () => (
  <Test2Page />
);

export const Default = Template.bind({});
