import React, { ChangeEvent, FC } from 'react';

import { Button } from '@components/button';
import { InfoBlock } from '@components/info-block';
import { InputRange } from '@components/input-range';
import { Loader } from '@components/loader';
import { COLORS } from '@styles/colors';

import { IMAGES } from '@constants/images';
import { PROMISES_AREA } from '@constants/promises-area';
import { QUESTION_SECTIONS } from '../../canvas-quiz-page.constants';

import { IWitProps } from './wit.typings';

import { TitleStyles } from '@styles/components/title-styles';
import { HeaderSectionStyled } from '../header-section.styles';
import { WitStyled as Styled } from './wit.styles';

export const Wit: FC<IWitProps> = (props) => {
  const { questionListForSection, onSubmitSection, onChangeAnswer } = props;

  const handleChange =
    (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
      onChangeAnswer(id, event.target.value);
    };

  return (
    <div>
      <HeaderSectionStyled.TitleWrapper>
        <h1>My SMARTs</h1>
        <HeaderSectionStyled.SectionLogo>WIT</HeaderSectionStyled.SectionLogo>
      </HeaderSectionStyled.TitleWrapper>
      <InfoBlock title="What do I like and am naturally good at?">
        <span>
          Take this
          <a
            href="https://www.flyingcape.com.sg/mi"
            target="_blank"
            rel="noreferrer"
          >
            {' quick test '}
          </a>
          to find out your Smarts
        </span>
      </InfoBlock>
      <Styled.DescriptionWrapper>
        <p>Rate yourself from 1 (not good) to 10 (perfect)</p>
      </Styled.DescriptionWrapper>
      {questionListForSection
        .sort((first, second) => first.order - second.order)
        .map((question) => (
          <div key={question.id}>
            <Styled.QuestionWrapper>
              <Styled.Visual>
                <img src={IMAGES[question?.subcategory || '']} />
              </Styled.Visual>
              <Styled.Label>
                <TitleStyles.h3
                  color={question.color || COLORS.lightBlue}
                  textAlign="left"
                >
                  {question?.subcategory}
                </TitleStyles.h3>
                <span>{question.title}</span>
              </Styled.Label>
            </Styled.QuestionWrapper>
            <InputRange
              onChange={handleChange(question.id)}
              minRange={1}
              maxRange={10}
              value={+question.answers[0]?.value || 5}
              color={question.color || COLORS.lightBlue}
              variant="number"
            />
          </div>
        ))}
      <Styled.Control>
        <Loader area={PROMISES_AREA.sendCanvasAnswers}>
          <Button
            title="Save & Next Section"
            borderRadius="8px"
            color={QUESTION_SECTIONS.WIT.color}
            onClick={onSubmitSection}
          />
        </Loader>
      </Styled.Control>
    </div>
  );
};
