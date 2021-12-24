import { COLORS } from '@styles/colors';
import { IResultPageProps } from '../canvas-results.typing';

import {
  ResultPage,
  ResultRange,
  CanvasResultsStyled as Styled,
} from './common';

export const GritResult = (props: IResultPageProps) => {
  const { questions } = props;

  return (
    <ResultPage header={{ logo: 'gritResultLogo' }} isGreyBg>
      <Styled.PageSubtitle>
        The strength of my character traits that can magnify my success
      </Styled.PageSubtitle>

      <Styled.RangesGrid>
        {questions.map(({ title, value, color }) => (
          <ResultRange
            key={title}
            title={title}
            value={+value}
            color={color || COLORS.lightBlue}
          />
        ))}
      </Styled.RangesGrid>
    </ResultPage>
  );
};
