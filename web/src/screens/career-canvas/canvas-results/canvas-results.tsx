import { Loader } from '@components/loader';
import { PROMISES_AREA } from '@constants/promises-area';

import {
  WitResult,
  GritResult,
  SkillsResult,
  FitResult,
  EnvironmentResult,
  PracticalityResult,
  ResultButtons,
  ResultTip,
} from './components';
import { ValuesResult } from './components/values-result';
import { useCanvasResults } from './canvas-results.state';
import { CanvasResultsStyled as Styled } from './canvas-results.styles';

export const CanvasResults = () => {
  const { results } = useCanvasResults();

  return (
    <Styled.Root>
      <Loader area={PROMISES_AREA.getCaasQuestionList}>
        {results && (
          <Styled.ResultsContainer>
            <Styled.LeftPagesContainer>
              <Styled.RowContainer>
                <WitResult questions={results.mySmarts} />
                <GritResult questions={results.myPerformanceCharacter} />
                <SkillsResult
                  criticalSkills={results.coreCriticalSkills}
                  technicalSkills={results.technicalSkills}
                />
              </Styled.RowContainer>

              <Styled.RowContainer>
                <ValuesResult
                  valuesQuestions={results.myValues}
                  anchorsQuestions={results.myCareerAnchors}
                />

                <Styled.TipBlock>
                  <Styled.FlexContainer>
                    <FitResult
                      MBTIQuestions={results.myMBTI}
                      hollandCodeQuestions={results.myHollandCode}
                    />
                    <EnvironmentResult questions={results.myIdealEnvironment} />
                  </Styled.FlexContainer>

                  <Styled.TipContainerDesktop>
                    <ResultTip />
                  </Styled.TipContainerDesktop>
                </Styled.TipBlock>
              </Styled.RowContainer>
            </Styled.LeftPagesContainer>

            <PracticalityResult questions={results.practicalityCheck} />

            <Styled.TipContainerMobile>
              <ResultTip />
            </Styled.TipContainerMobile>
          </Styled.ResultsContainer>
        )}
      </Loader>

      <ResultButtons />
    </Styled.Root>
  );
};
