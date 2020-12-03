import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import AppWithRedux from './AppWithRedux';
import {Provider} from 'react-redux'
import {store} from '../state/store' 

export default {
    title: 'App With Redux',
    component: AppWithRedux
} as Meta;

export const AppWithReduxtSories = () => {
    return <> 
        <Provider store={store}>
            <AppWithRedux/>
        </Provider>
    </>
}