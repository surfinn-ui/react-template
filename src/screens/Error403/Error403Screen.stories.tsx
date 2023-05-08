import { StoryFn, Meta } from '@storybook/react';
import {
  Error403ScreenView,
  IError403ScreenViewProps,
} from './Error403ScreenView';

export default {
  title: 'Screens/Error403Screen',
  component: Error403ScreenView,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as Meta<typeof Error403ScreenView>;

const Template: StoryFn<typeof Error403ScreenView> = (
  args: IError403ScreenViewProps,
) => <Error403ScreenView {...args} />;

export const Default = Template.bind({});

Default.args = {
  // Add props here
};
