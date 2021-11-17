import { COLORS } from '@styles/colors';

import { CanvasResultsStyled, ResultPage, ResultRange } from '../common';
import { IResultQuestion } from '../../canvas-results.typing';

import { MBTIOption } from './mbti-option';
import { FitResultStyled as Styled } from './fit-result.styles';

interface IProps {
  MBTIQuestions: IResultQuestion[];
  hollandCodeQuestions: IResultQuestion[];
}

export const FitResult = (props: IProps) => {
  const { MBTIQuestions, hollandCodeQuestions } = props;

  return (
    <ResultPage header={{ logo: 'fitResultLogo' }} isWithPadding={false}>
      <Styled.BgContainer>
        <CanvasResultsStyled.PageTitle>
          My PERSONALITY
        </CanvasResultsStyled.PageTitle>

        <Styled.SectionsContainer>
          <div>
            <p>My MBTI</p>
            <Styled.MBTIContainer>
              {MBTIQuestions.map(({ value, color }, index) => (
                <MBTIOption
                  key={index}
                  color={color || COLORS.liteBlue}
                  value={value}
                />
              ))}
            </Styled.MBTIContainer>
          </div>

          <div>
            <p>My Holland Code</p>
            <Styled.RangesContainer>
              <CanvasResultsStyled.RangesGrid columnGap="50px">
                {hollandCodeQuestions.map(({ title, value, color }) => (
                  <ResultRange
                    key={title}
                    title={title}
                    value={+value}
                    maxValue={6}
                    color={color || COLORS.liteBlue}
                    circleSize={16}
                  />
                ))}
              </CanvasResultsStyled.RangesGrid>
            </Styled.RangesContainer>
          </div>
        </Styled.SectionsContainer>
      </Styled.BgContainer>
    </ResultPage>
  );
};
