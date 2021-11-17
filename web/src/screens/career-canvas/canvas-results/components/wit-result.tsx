import styled from 'styled-components';

import { COLORS } from '@styles/colors';

import { IResultPageProps } from '../canvas-results.typing';

import {
  ResultPage,
  ResultRange,
  CanvasResultsStyled as Styled,
} from './common';

const RangesContainer = styled.div`
  margin: 8px 0 16px;
`;

export const WitResult = (props: IResultPageProps) => {
  const { questions } = props;

  return (
    <ResultPage header={{ logo: 'witResultLogo' }}>
      <Styled.PageSubtitle>
        What do I like and am naturally good at?
      </Styled.PageSubtitle>

      <RangesContainer>
        <Styled.RangesGrid>
          {questions.map(({ title, value, color }) => (
            <ResultRange
              key={title}
              title={title}
              value={+value}
              color={color || COLORS.liteBlue}
            />
          ))}
        </Styled.RangesGrid>
      </RangesContainer>
    </ResultPage>
  );
};
