import { StoryFn, Meta } from '@storybook/react';
import {
  Error404ScreenView,
  IError404ScreenViewProps,
} from './Error404ScreenView';

export default {
  title: 'Screens/Error404Screen',
  component: Error404ScreenView,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as Meta<typeof Error404ScreenView>;

const Template: StoryFn<typeof Error404ScreenView> = (
  args: IError404ScreenViewProps,
) => <Error404ScreenView {...args} />;

export const Default = Template.bind({});

Default.args = {
  // Add props here
};
