import { COLORS } from '@styles/colors';
import { IResultQuestion } from '../../canvas-results.typing';
import { ResultImportance, ResultPage, ResultText } from '../common';

import { RANGE_HASH_MAPS } from '@screens/career-canvas/career-canvas.constants';

import { ValuesResultStyled as Styled } from './values-result.styles';

interface IProps {
  valuesQuestions: IResultQuestion[];
  anchorsQuestions: IResultQuestion[];
}

export const ValuesResult = (props: IProps) => {
  const { valuesQuestions, anchorsQuestions } = props;

  return (
    <ResultPage header={{ title: 'My VALUES' }}>
      <Styled.PageContainer>
        {valuesQuestions.map(({ title, value, type }) => (
          <ResultText
            key={title}
            title={title}
            value={value}
            height={type === 'options' ? 'auto' : '50px'}
          />
        ))}

        <div>
          <Styled.AnchorsTitleContainer>
            <Styled.AnchorsTitle>My Career Anchors</Styled.AnchorsTitle>
            <Styled.AnchorsTitleImportance>
              <span>Not Imp.</span>
              <b>Very Important</b>
            </Styled.AnchorsTitleImportance>
          </Styled.AnchorsTitleContainer>

          <Styled.RangesContainer>
            {anchorsQuestions.map(({ title, value, color }) => (
              <ResultImportance
                key={title}
                title={title}
                value={+RANGE_HASH_MAPS[value]}
                color={color || COLORS.lightBlue}
              />
            ))}
          </Styled.RangesContainer>
        </div>
      </Styled.PageContainer>
    </ResultPage>
  );
};
