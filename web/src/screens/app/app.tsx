import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Router } from './app.router';

import './app.css';

export const App: React.FC = () => (
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);
