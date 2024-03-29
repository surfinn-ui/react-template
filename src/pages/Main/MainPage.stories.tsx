import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainPageView } from './MainPageView';

export default {
  title: 'Pages/MainPage',
  component: MainPageView,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MainPageView>;

const Template: ComponentStory<typeof MainPageView> = (args) => (
  <MainPageView {...args} />
);

export const Default = Template.bind({});

Default.args = {};
