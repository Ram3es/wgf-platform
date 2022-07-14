import { FC, useMemo } from 'react';
import { IEditTableProps } from '../edit-table-info';
import { QuizesTile } from './quizes-tile';
import { UserProgresStyles as Styled } from './user-progres-games.styles';
import { NAME_OF_QUIZ } from './user-progres.constants';

export const UserProgresGames: FC<IEditTableProps> = ({ user }) => {
  const quizes = user.results?.map((item) =>
    Object.values(item.quiz.title).join('')
  );

  const uniqueQuizes = Array.from(new Set(quizes));

  const lastResults = uniqueQuizes.map((quiz) => {
    const quizResult = user?.results?.filter((result) =>
      result.quiz.title.includes(quiz)
    );
    const sortedResult = quizResult?.sort((a, b) =>
      a.created < b.created ? 1 : -1
    );
    return sortedResult?.[0];
  });

  const renderTiles = useMemo(() => {
    return NAME_OF_QUIZ.quizes.map((title, idx) => (
      <QuizesTile key={idx} title={title} lastResult={lastResults} />
    ));
  }, [NAME_OF_QUIZ, user]);

  return (
    <>
      <Styled.QuizName>Assessments</Styled.QuizName>
      <Styled.QuizFlex>{renderTiles}</Styled.QuizFlex>
    </>
  );
};
