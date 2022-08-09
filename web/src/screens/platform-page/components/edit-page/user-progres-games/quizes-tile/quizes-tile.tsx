import { DATE_TIME_OPTIONS } from '@constants/date';
import { IMAGES } from '@constants/images';
import { STRINGS } from '@constants/strings';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { IEditUserProps } from '../../edit-table-info';
import { IResultUser, TQuiz } from '../user-progres.constants';
import { QuizesTileStyles as Styled } from './quizes-tile.styles';

interface IQuizTileProps {
  quize: Record<string, TQuiz>;
  lastResult: (IResultUser | undefined)[];
  user: IEditUserProps;
}
export const QuizesTile: FC<IQuizTileProps> = ({ quize, lastResult, user }) => {
  const { push } = useHistory();

  const title = Object.keys(quize).join();
  const imgName = quize[title].imgName;
  const quizName = quize[title].quizNameDB;

  const [renderResult] = lastResult.filter((res) =>
    res?.quiz?.title?.includes(quizName)
  );

  const handleViewReport = () => {
    const url = quize[title].pathResult;
    const id = renderResult?.quiz.id;
    const name = user.lastName;
    push(
      `${url}?quizTitle=${title}&quizId=${id}&userId=${user.id}&userName=${name}`
    );
  };

  return (
    <>
      <Styled.WrapperQuiz>
        <Styled.QuizShadow>
          <img src={IMAGES[imgName]} alt={STRINGS.altLogo} />
          <Styled.QuizName>{title}</Styled.QuizName>
          <Styled.Outlines>
            <Styled.BlackText>Status</Styled.BlackText>
            <Styled.InfoText>
              {renderResult?.status === 'Completed' ? (
                <Styled.StatusFlex>
                  {renderResult?.status}
                  <Styled.Button onClick={handleViewReport} dark>
                    View Report
                  </Styled.Button>
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
                      onChange={() => {
                        return;
                      }}
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
