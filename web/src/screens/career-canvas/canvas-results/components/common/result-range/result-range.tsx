import { IResultProgressProps, ResultProgress } from './progress';

import { IMAGES } from '@constants/images';

import { Styled } from './result-range.styles';

interface IResultRangeProps extends IResultProgressProps {
  title: string;
}

export const ResultRange = (props: IResultRangeProps) => {
  const { title, ...progressProps } = props;
  const imgSrc = IMAGES[title];

  return (
    <>
      <Styled.TitleContainer>
        {imgSrc && (
          <Styled.ImageContainer>
            <img src={imgSrc} />
          </Styled.ImageContainer>
        )}

        <Styled.Title>{title}</Styled.Title>
      </Styled.TitleContainer>

      <Styled.ProgressContainer>
        <ResultProgress {...progressProps} />
      </Styled.ProgressContainer>
    </>
  );
};
