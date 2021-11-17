import { IMAGES } from '@constants/images';

import {
  IImportanceProgressProps,
  ImportanceProgress,
} from './importance-progress';
import { ResultImportanceStyled as Styled } from './result-importance.styles';

interface IProps extends IImportanceProgressProps {
  title: string;
}

export const ResultImportance = (props: IProps) => {
  const { title, ...progressProps } = props;

  const imgSrc = IMAGES[title];

  return (
    <Styled.Root>
      <Styled.TitleContainer>
        {imgSrc && (
          <Styled.ImageContainer>
            <img src={imgSrc} />
          </Styled.ImageContainer>
        )}

        <Styled.Title>{title}</Styled.Title>
      </Styled.TitleContainer>

      <Styled.ProgressContainer>
        <ImportanceProgress {...progressProps} />
      </Styled.ProgressContainer>
    </Styled.Root>
  );
};
