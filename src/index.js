import React from 'react';
import ReactDOM from 'react-dom';
import ReactBreakpoints from 'react-breakpoints'
import App from './App'
import {breakpoints} from './data/breakpoints';
import './index.css';

ReactDOM.render(
  <ReactBreakpoints breakpoints={breakpoints}>
    <App />
  </ReactBreakpoints>,
  document.getElementById('root'),
)
