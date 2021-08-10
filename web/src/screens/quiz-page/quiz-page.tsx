import React from 'react';

import { BannerImage } from '@components/banner-image';
import { Header } from '@components/header';
import { Container } from '@styles/components/container';
import { Banner } from './components/banner';
import { Form } from './components/form';

export const QuizPage: React.FC = () => (
  <>
    <Header />
    <BannerImage />
    <Container>
      <Banner />
      <Form />
    </Container>
  </>
);
