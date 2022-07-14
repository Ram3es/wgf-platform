import { DATE_TIME_OPTIONS } from '@constants/date';
import { IMAGES } from '@constants/images';
import { STRINGS } from '@constants/strings';
import { FC } from 'react';
import { IResultUser, NAME_OF_QUIZ } from '../user-progres.constants';
import { QuizesTileStyles as Styled } from './quizes-tile.styles';

interface IQuizTileProps {
  title: { [key: string]: string };
  lastResult: (IResultUser | undefined)[];
}
export const QuizesTile: FC<IQuizTileProps> = ({ title, lastResult }) => {
  const key = Object.keys(title).join();
  const value = Object.values(title).join();
  const quizName = NAME_OF_QUIZ.title[key];

  const [renderResult] = lastResult.filter((res) =>
    res?.quiz?.title?.includes(quizName)
  );

  return (
    <>
      <Styled.WrapperQuiz>
        <Styled.QuizShadow>
          <img src={IMAGES[value]} alt={STRINGS.altLogo} />
          <Styled.QuizName>{key}</Styled.QuizName>
          <Styled.Outlines>
            <Styled.BlackText>Status</Styled.BlackText>
            <Styled.InfoText>
              {renderResult?.status === 'Completed' ? (
                <Styled.StatusFlex>
                  {renderResult?.status}
                  <Styled.Button dark>View Report</Styled.Button>
                </Styled.StatusFlex>
              ) : (
                renderResult?.status && (
                  <>
                    {renderResult?.status}
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={renderResult?.status.substring(
                        0,
                        renderResult?.status.length - 1
                      )}
                      onChange={() => ''}
                      id="myRange"
                    />
                    <Styled.Button>View Status</Styled.Button>
                  </>
                )
              )}
            </Styled.InfoText>
          </Styled.Outlines>
          <Styled.Outlines>
            <Styled.BlackText>Last Updated</Styled.BlackText>
            <Styled.InfoText>
              {renderResult?.created
                ? new Date(renderResult?.created as Date).toLocaleString(
                    'en-US',
                    DATE_TIME_OPTIONS
                  )
                : 'No results yet'}
            </Styled.InfoText>
          </Styled.Outlines>
        </Styled.QuizShadow>
      </Styled.WrapperQuiz>
    </>
  );
};
