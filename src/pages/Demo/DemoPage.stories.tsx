import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DemoPageView } from './DemoPageView';

export default {
  title: 'Pages/DemoPage',
  component: DemoPageView,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof DemoPageView>;

const Template: ComponentStory<typeof DemoPageView> = (args) => (
  <DemoPageView {...args} />
);

export const Default = Template.bind({});

Default.args = {};
