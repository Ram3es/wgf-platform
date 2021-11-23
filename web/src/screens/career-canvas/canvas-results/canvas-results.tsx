import { Loader } from '@components/loader';
import {
    EnvironmentResult, FitResult, GritResult, PracticalityResult, ResultButtons, ResultTip,
    SkillsResult, WitResult
} from './components';
import { ValuesResult } from './components/values-result';

import { useCanvasResults } from './canvas-results.state';

import { PROMISES_AREA } from '@constants/promises-area';

import { CanvasResultsStyled as Styled } from './canvas-results.styles';

export const CanvasResults = () => {
  const { results, generatePdf } = useCanvasResults();

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
      <Styled.ButtonsContainer>
        <Loader area={PROMISES_AREA.printCareerCanvasPdf}>
          <ResultButtons downloadPdf={generatePdf} />
        </Loader>
      </Styled.ButtonsContainer>
    </Styled.Root>
  );
};
