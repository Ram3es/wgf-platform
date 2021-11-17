import { FC } from 'react';

import { IMAGES } from '@constants/images';
import { CanvasResultsStyled } from '../styled';

import {
  IBgContainerProps,
  ResultPageStyled as Styled,
} from './result-page.styles';

interface IHeaderProps {
  logo?: string;
  title?: string;
  paddingLeft?: string;
}

interface IProps extends IBgContainerProps {
  header: IHeaderProps;
  width?: string;
}

export const ResultPage: FC<IProps> = (props) => {
  const { width, header, children, ...bgContainerProps } = props;
  const { logo, title, paddingLeft } = header;

  return (
    <Styled.Root width={width}>
      <Styled.BgContainer {...bgContainerProps}>
        {logo && (
          <Styled.LogoContainer paddingLeft={paddingLeft}>
            <img src={IMAGES[logo]} />
          </Styled.LogoContainer>
        )}
        {title && (
          <CanvasResultsStyled.PageTitle paddingLeft={paddingLeft}>
            {title}
          </CanvasResultsStyled.PageTitle>
        )}

        {children}
      </Styled.BgContainer>
    </Styled.Root>
  );
};
