import React from 'react';

import { Header } from '@components/header';
import { Container } from '@styles/components/container';
import { BannerImage } from '../components/banner-image';
import { HeaderQuiz } from '../components/header-quiz';
import { Banner } from './components/banner';
import { Quiz } from './components/quiz';
import { Footer } from '@components/footer';

export const QuizPage: React.FC = () => (
  <>
    <Header />
    <HeaderQuiz />
    <BannerImage />
    <Container>
      <Banner />
      <Quiz />
    </Container>
    <Footer />
  </>
);
