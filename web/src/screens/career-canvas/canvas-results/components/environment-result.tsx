import styled from 'styled-components';

import { IResultPageProps } from '../canvas-results.typing';

import { ResultPage, ResultText } from './common';

const TextsContainer = styled.div`
  > * {
    margin-top: 5px;
  }
`;

export const EnvironmentResult = (props: IResultPageProps) => {
  const { questions } = props;

  return (
    <ResultPage header={{ title: 'My IDEAL ENVIRONMENT', paddingLeft: '5px' }}>
      <TextsContainer>
        {questions.map(({ title, value }) => (
          <ResultText key={title} title={title} value={value} height="85px" />
        ))}
      </TextsContainer>
    </ResultPage>
  );
};
