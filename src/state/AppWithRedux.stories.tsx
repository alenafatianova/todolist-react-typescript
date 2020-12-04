import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import AppWithRedux from './AppWithRedux';
import { ReduxStoreProviderDecorator } from '../stories/ReduxStoriesProviderDecorator';

export default {
    title: 'App With Redux',
    component: AppWithRedux,
    argTypes: {},
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = () => <AppWithRedux/>

export const AppWithReduxtSoriesExample = Template.bind({});
