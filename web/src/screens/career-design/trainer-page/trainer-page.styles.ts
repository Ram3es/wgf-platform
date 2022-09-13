import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import { COLORS } from '@styles/colors';
import styled from 'styled-components';

export const TrainerPageStyles = {
  HeaderWrapper: styled.div`
    display: flex;
    height: auto;
  `,
  IconTextWrapper: styled.div`
    display: flex;
    padding-right: 28px;

    svg {
      border-radius: 14px;
      box-shadow: 0 22px 25px rgba(0, 0, 0, 0.17);
    }
  `,
  TextWithDivider: styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    border-bottom: 1px solid #a7a9ac;
    font-family: ${FONTS.family.frutigerBold};
    font-size: ${FONTS.sizes[28]};
    color: ${COLORS.grey};
  `,
  Content: styled.div`
    margin: 0 90px 0 30px;

    ${Media.mobile`
    margin: 0 10px 0 15px;
    `}
  `,
  GameSetting: styled.div`
    width: auto;
    height: auto;
    background-color: ${COLORS.authBg};
    border-radius: 20px;
    margin: 30px 0px 0 90px;
    box-shadow: 0px 0px 28px rgba(0, 0, 0, 0.15);

    ${Media.mobile`
    margin:20px 10px 10px 10px;
    `}
  `,

  Title: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 35px;
    width: auto;
    padding: 20px 0 15px;

    ${Media.mobile`
    margin: 0 10px;
    `}

    h2 {
      font-family: 'AbsideSmooth';
      font-weight: normal;
      line-height: 32px;
      padding: 2px;
    }
  `,
  LimitTitle: styled.div`
    display: flex;
    height: 50px;
    align-items: center;
  `,
  IconWrapper: styled.div`
    display: flex;
    padding: 0 15px;
    align-items: center;

    /*  */
  `,
  TbaleSettings: styled.div`
    width: 100%;
    height: auto;
    padding: 10px 25px 25px 75px;

    ${Media.mobile`
    padding: 25px 15px ;
    `}
  `,

  GameBtnContainer: styled.div`
    display: flex;
    margin-top: 70px;
    justify-content: space-between;

    ${Media.mobile`
    margin-top: 140px;
    justify-content: center;
    `}
  `,
  InfoTabletsWrap: styled.div`
    position: relative;
  `,
  Tablet1: styled.div`
    position: absolute;
    left: 90px;
    display: block;
    border: 2px solid ${COLORS.white};
    border-radius: 20px;
    width: 160px;
    min-height: 100px;
    box-shadow: 0px 20px 70px rgba(86, 89, 146, 0.1);

    div {
      display: flex;
      font-size: ${FONTS.sizes[14]};
      margin: auto;
      min-height: 50px;
      padding: 10px 0 0 15px;
      align-items: center;
    }
    p {
      padding: 0 20px;
      font-size: ${FONTS.sizes[30]};
      color: ${COLORS.grey};
      font-family: ${FONTS.family.frutigerNormal};
    }
    ${Media.mobile`
    left: -30px;
    top: -120px;
    `}
  `,
  Tablet2: styled.div`
    position: absolute;
    left: 275px;
    border: 2px solid ${COLORS.white};
    border-radius: 20px;
    min-width: 160px;
    min-height: 100px;
    box-shadow: 0px 20px 70px rgba(86, 89, 146, 0.1);

    div {
      font-size: ${FONTS.sizes[14]};
      margin: auto;
      padding: 10px 0 0 15px;
      min-height: 50px;
    }
    p {
      padding: 0 20px;
      font-size: ${FONTS.sizes[30]};
      color: ${COLORS.red};
    }
    ${Media.mobile`
    left: 150px;
    top: -120px;
    `}
  `,
  Warning: styled.div`
    display: flex;
    align-items: center;
    border-radius: 10px;
    border: 2px solid orange;
    color: orange;
    padding: 10px 15px;
  `,
};
