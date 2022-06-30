import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import styled, { css } from 'styled-components';

export const EditPageStyles = {
  Wrapper: styled.div`
    position: relative;
    width: 100%;
    padding: 35px 0;
    border-top-left-radius: 20px;
    overflow: hidden;
    min-height: calc(200vh - 95px);
    margin-left: 10px;

    ${Media.desktop1600`
    padding: 70px 0;
  `}

    ${Media.landscape`
    padding: 20px 0;
  `}

  ${Media.tablet`
    width: 100%;
    min-height: calc(200vh - 135px);
    border-top-left-radius: 0;
    margin-left: 0px;
  `}
  ${Media.sMobile`
    margin-left: 0px;
    `}
  `,
  HeaderWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 462px;

    ${Media.mobile(css`
      width: 300px;
    `)}
  `,
  Flex: styled.div`
    display: flex;
    align-items: center;
  `,

  AvatarWrapper: styled.div`
    height: 50px;
    width: 50px;
    overflow: hidden;
    border-radius: 50%;
    margin: 20px 20px 20px 12px;
  `,

  TableWrapper: styled.div`
    max-width: 462px;
    margin-left: 0px;

    ${Media.tablet`
 padding: 20px;
`}

    ${Media.mobile`
 padding: 20px 0;
`}
  `,

  TableShadow: styled.div<{ ml?: number }>`
    padding: 45px 5px 20px 25px;
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid ${COLORS.white};
    box-shadow: 0px 20px 70px rgba(86, 89, 146, 0.1);
    border-radius: 20px;
    margin-left: ${({ ml }) => (ml ? `${ml}px` : '0')};
    margin-bottom: 50px;
    ${Media.landscapeWreck`
  margin-left: 0;
`}
  `,
  RowWrapper: styled.div`
    display: flex;
  `,

  Text: styled.div`
    width: 116px;
    color: ${COLORS.grey};
    font-family: ${FONTS.family.frutigerNormal};
    font-size: ${FONTS.sizes[16]};
    padding: 0px 5px 26px 0px;
  `,

  TextBold: styled.div`
    color: ${COLORS.grey};
    font-family: ${FONTS.family.frutigerBold};
    font-size: ${FONTS.sizes[16]};
    padding: 0px 5px 26px 0px;
  `,
  IconWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    cursor: pointer;
  `,
};
