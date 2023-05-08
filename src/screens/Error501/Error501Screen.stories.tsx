import { StoryFn, Meta } from '@storybook/react';
import {
  Error501ScreenView,
  IError501ScreenViewProps,
} from './Error501ScreenView';

export default {
  title: 'Screens/Error501Screen',
  component: Error501ScreenView,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as Meta<typeof Error501ScreenView>;

const Template: StoryFn<typeof Error501ScreenView> = (
  args: IError501ScreenViewProps,
) => <Error501ScreenView {...args} />;

export const Default = Template.bind({});

Default.args = {
  // Add props here
};
