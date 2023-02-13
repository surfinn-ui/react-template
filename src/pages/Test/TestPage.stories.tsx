import { ComponentStory, ComponentMeta } from '@storybook/react';
import TestPage from './TestPage';

export default {
  title: 'pages/TestPage',
  component: TestPage,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof TestPage>;

const Template: ComponentStory<typeof TestPage> = () => (
  <TestPage />
);

export const Default = Template.bind({});
