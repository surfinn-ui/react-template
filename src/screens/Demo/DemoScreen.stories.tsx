import { StoryFn, Meta } from '@storybook/react';
import { DemoScreenView, IDemoScreenViewProps } from './DemoScreenView';

export default {
  title: 'Screens/DemoScreen',
  component: DemoScreenView,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as Meta<typeof DemoScreenView>;

const Template: StoryFn<typeof DemoScreenView> = (
  args: IDemoScreenViewProps,
) => <DemoScreenView {...args} />;

export const Default = Template.bind({});

Default.args = {
  // Add props here
};
