import { ComponentStory, ComponentMeta } from '@storybook/react';
import TestPage from './Test.page';

export default {
  title: 'pages/TestPage',
  component: TestPage,
} as ComponentMeta<typeof TestPage>;

const Template: ComponentStory<typeof TestPage> = () => <TestPage />;

export const Default = Template.bind({});
