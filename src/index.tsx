import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';

import App from './App';

ReactDOM.render(
  <FluentProvider theme={teamsLightTheme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FluentProvider>,
  document.getElementById('root'),
);