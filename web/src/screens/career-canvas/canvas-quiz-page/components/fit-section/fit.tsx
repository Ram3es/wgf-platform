import React, { FC } from 'react';

import { Button } from '@components/button';
import { Loader } from '@components/loader';
import { MyCareerAnchors } from './components/my-career-anchors';
import { MyHollandCode } from './components/my-holland-code';
import { MyIdealEnvironment } from './components/my-ideal-environment';
import { MyMBTI } from './components/my-MBTI';
import { MyValues } from './components/my-values';

import { PROMISES_AREA } from '@constants/promises-area';
import { QUESTION_SECTIONS } from '../../canvas-quiz-page.constants';

import { IFitProps } from './fit.typings';

import { HeaderSectionStyled } from '../header-section.styles';
import { FitStyled as Styled } from './fit.styles';

export const Fit: FC<IFitProps> = (props) => {
  const { questionListForSection, onSubmitSection, onChangeAnswer } = props;

  const questionListForCategory = (category: string) =>
    questionListForSection
      .filter((item) => item.category === category)
      .sort((first, second) => first.order - second.order);

  return (
    <div>
      <HeaderSectionStyled.TitleWrapper>
        <h1>My VALUES</h1>
        <HeaderSectionStyled.SectionLogo>FIT</HeaderSectionStyled.SectionLogo>
      </HeaderSectionStyled.TitleWrapper>
      <MyValues
        questionList={questionListForCategory('myValues')}
        onChangeAnswer={onChangeAnswer}
      />
      <MyCareerAnchors
        questionList={questionListForCategory('myCareerAnchors')}
        onChangeAnswer={onChangeAnswer}
      />
      <HeaderSectionStyled.TitleWrapper>
        <h1>My PERSONALITY</h1>
      </HeaderSectionStyled.TitleWrapper>
      <MyMBTI
        questionList={questionListForCategory('myMBTI')}
        onChangeAnswer={onChangeAnswer}
      />
      <MyHollandCode
        questionList={questionListForCategory('myHollandCode')}
        onChangeAnswer={onChangeAnswer}
      />
      <HeaderSectionStyled.TitleWrapper>
        <h1>MY IDEAL ENVIRONMENT</h1>
      </HeaderSectionStyled.TitleWrapper>
      <MyIdealEnvironment
        questionList={questionListForCategory('myIdealEnvironment')}
        onChangeAnswer={onChangeAnswer}
      />
      <Styled.Control>
        <Loader area={PROMISES_AREA.sendCanvasAnswers}>
          <Button
            title="Save & Next Section"
            borderRadius="8px"
            color={QUESTION_SECTIONS.FIT.color}
            onClick={onSubmitSection}
          />
        </Loader>
      </Styled.Control>
    </div>
  );
};
