import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { BannerImage } from '@components/banner-image';
import { Header } from '@components/header';
import { Router } from './app.router';

import './app.css';

export const App: React.FC = () => (
  <BrowserRouter>
    <div>
      <Header />
      <BannerImage />
    </div>
    <Router />
  </BrowserRouter>
);
