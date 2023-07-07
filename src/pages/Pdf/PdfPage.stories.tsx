import { Meta, StoryFn } from '@storybook/react';
import { PdfPageView } from './PdfPageView';

export default {
  title: 'Pages/PdfPage',
  component: PdfPageView,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as Meta<typeof PdfPageView>;

const Template: StoryFn<typeof PdfPageView> = (args) => (
  <PdfPageView {...args}/>
);

export const Default = Template.bind({});

Default.args = {
};
