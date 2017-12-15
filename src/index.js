import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Dashboard from './dashboard/components/Dashboard';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Dashboard />, document.getElementById('root'));
registerServiceWorker();
