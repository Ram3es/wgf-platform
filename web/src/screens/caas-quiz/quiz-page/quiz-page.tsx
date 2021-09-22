import React from 'react';

import { Container } from '@styles/components/container';
import { BannerImage } from '../components/banner-image';
import { HeaderQuiz } from '../components/header-quiz';
import { Banner } from './components/banner';
import { Quiz } from './components/quiz';

export const QuizPage: React.FC = () => (
  <>
    <HeaderQuiz />
    <BannerImage />
    <Container>
      <Banner />
      <Quiz />
    </Container>
  </>
);
