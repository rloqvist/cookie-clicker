import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from '../App';

it('renders without crashing', () => {
  renderer.create(<App />);
});
