import { StoryFn, Meta } from '@storybook/react';
import { DemoPageView, IDemoPageViewProps } from './DemoPageView';

export default {
  title: 'Pages/DemoPage',
  component: DemoPageView,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as Meta<typeof DemoPageView>;

const Template: StoryFn<typeof DemoPageView> = (args: IDemoPageViewProps) => (
  <DemoPageView {...args} />
);

export const Default = Template.bind({});

Default.args = {};
