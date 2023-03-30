import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PageHeaderView } from './PageHeaderView';

export default {
  title: 'Components/PageHeaderView',
  component: PageHeaderView,
} as ComponentMeta<typeof PageHeaderView>;

const Template: ComponentStory<typeof PageHeaderView> = (args) => (
  <PageHeaderView {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'PageHeaderView',
};
