import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { AppWithRedux } from './state/AppWithRedux';
import {store} from './state/store'

ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>,  
    document.getElementById('root')
    );

