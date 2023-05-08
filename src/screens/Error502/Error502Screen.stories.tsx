import { StoryFn, Meta } from '@storybook/react';
import {
  Error502ScreenView,
  IError502ScreenViewProps,
} from './Error502ScreenView';

export default {
  title: 'Screens/Error502Screen',
  component: Error502ScreenView,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as Meta<typeof Error502ScreenView>;

const Template: StoryFn<typeof Error502ScreenView> = (
  args: IError502ScreenViewProps,
) => <Error502ScreenView {...args} />;

export const Default = Template.bind({});

Default.args = {
  // Add props here
};
