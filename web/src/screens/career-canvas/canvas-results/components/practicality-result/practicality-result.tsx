import { IMAGES } from '@constants/images';

import { ResultPage, ResultText } from '../common';
import { IResultPageProps } from '../../canvas-results.typing';

import { PracticalityResultStyled as Styled } from './practicality-result.styles';

export const PracticalityResult = (props: IResultPageProps) => {
  const { questions } = props;

  return (
    <ResultPage
      width="200px"
      header={{ title: 'PRACTICALITY CHECK', paddingLeft: '5px' }}
      isGreyBg
    >
      <Styled.AnswersContainer>
        {questions.map(({ title, value }) => (
          <ResultText
            key={title}
            title={title}
            value={value}
            height="122px"
            isYellow
          />
        ))}
      </Styled.AnswersContainer>

      <Styled.LogoContainer>
        <img src={IMAGES.avidAdventures} />
      </Styled.LogoContainer>
    </ResultPage>
  );
};
