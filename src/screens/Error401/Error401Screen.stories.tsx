import { StoryFn, Meta } from '@storybook/react';
import {
  Error401ScreenView,
  IError401ScreenViewProps,
} from './Error401ScreenView';

export default {
  title: 'Screens/Error401Screen',
  component: Error401ScreenView,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as Meta<typeof Error401ScreenView>;

const Template: StoryFn<typeof Error401ScreenView> = (
  args: IError401ScreenViewProps,
) => <Error401ScreenView {...args} />;

export const Default = Template.bind({});

Default.args = {
  // Add props here
};
