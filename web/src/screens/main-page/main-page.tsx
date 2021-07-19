import React from 'react';

import { Container } from '@styles/components/container';
import { Banner } from './components/banner';
import { Form } from './components/form';

export const MainPage: React.FC = () => (
  <Container>
    <Banner />
    <Form />
  </Container>
);
