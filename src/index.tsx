import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { AppWithRedux } from './state/AppWithRedux';

ReactDOM.render(<AppWithRedux />,  document.getElementById('root'));


serviceWorker.unregister();
