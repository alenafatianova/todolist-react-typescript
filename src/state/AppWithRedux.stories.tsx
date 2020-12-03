import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import AppWithRedux from './AppWithRedux';
import {Provider} from 'react-redux'
import {store} from '../state/store' 
import { ReduxStoreProviderDecorator } from '../stories/ReduxStoriesProviderDecorator';

export default {
    title: 'App With Redux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

export const AppWithReduxtSories = () => {
    return <> 
        <AppWithRedux/>
    </>
}