import { StoryFn, Meta } from '@storybook/react';
import {
  Error402ScreenView,
  IError402ScreenViewProps,
} from './Error402ScreenView';

export default {
  title: 'Screens/Error402Screen',
  component: Error402ScreenView,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as Meta<typeof Error402ScreenView>;

const Template: StoryFn<typeof Error402ScreenView> = (
  args: IError402ScreenViewProps,
) => <Error402ScreenView {...args} />;

export const Default = Template.bind({});

Default.args = {
  // Add props here
};
