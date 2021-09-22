import React from 'react';

import { Container } from '@styles/components/container';
import { BannerImage } from '../components/banner-image';
import { Header } from '../components/header';
import { Banner } from './components/banner';
import { Quiz } from './components/quiz';

export const QuizPage: React.FC = () => (
  <>
    <Header />
    <BannerImage />
    <Container>
      <Banner />
      <Quiz />
    </Container>
  </>
);
