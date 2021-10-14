import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from './app.router';

import './app.css';

export const App: React.FC = () => (
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);
