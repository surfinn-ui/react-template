import { StoryFn, Meta } from '@storybook/react';
import {
  Error503ScreenView,
  IError503ScreenViewProps,
} from './Error503ScreenView';

export default {
  title: 'Screens/Error503Screen',
  component: Error503ScreenView,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as Meta<typeof Error503ScreenView>;

const Template: StoryFn<typeof Error503ScreenView> = (
  args: IError503ScreenViewProps,
) => <Error503ScreenView {...args} />;

export const Default = Template.bind({});

Default.args = {
  // Add props here
};
