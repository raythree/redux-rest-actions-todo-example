import React from 'react';
import {render} from '@testing-library/react';
import App from './App';
import configureStore from './store';

test('renders learn react link', () => {
  const {getByText} = render(<App />);
});
