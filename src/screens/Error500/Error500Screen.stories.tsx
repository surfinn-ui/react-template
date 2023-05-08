import { StoryFn, Meta } from '@storybook/react';
import {
  Error500ScreenView,
  IError500ScreenViewProps,
} from './Error500ScreenView';

export default {
  title: 'Screens/Error500Screen',
  component: Error500ScreenView,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as Meta<typeof Error500ScreenView>;

const Template: StoryFn<typeof Error500ScreenView> = (
  args: IError500ScreenViewProps,
) => <Error500ScreenView {...args} />;

export const Default = Template.bind({});

Default.args = {
  // Add props here
};
