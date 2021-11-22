import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

import { IMAGES } from '@constants/images';

export const HeaderSectionStyled = {
  TitleWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    h1 {
      font-family: ${FONTS.family.absideSmooth};
      font-size: ${FONTS.sizes[30]};
      color: ${COLORS.grey};
      font-weight: 400;

      ${Media.tablet(css`
        font-size: ${FONTS.sizes[26]};
      `)};

      ${Media.mobile(css`
        font-size: ${FONTS.sizes[22]};
      `)};
    }
  `,
  SectionLogo: styled.div`
    height: 68px;
    width: 115px;
    background-image: url(${IMAGES.sectionLogo});
    background-repeat: no-repeat;
    background-size: cover;
    font-size: ${FONTS.sizes[33]};
    font-family: ${FONTS.family.frutigerBold};
    padding: 8px 22px;
    color: ${COLORS.black};

    ${Media.tablet(css`
      padding: 5px 15px;
      height: 50px;
      width: 86px;
      font-size: ${FONTS.sizes[26]};
    `)};

    ${Media.mobile(css`
      padding: 3px 10px;
      height: 40px;
      width: 70px;
      font-size: ${FONTS.sizes[22]};
    `)};
  `,
};
