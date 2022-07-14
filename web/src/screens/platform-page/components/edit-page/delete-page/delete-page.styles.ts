import { Z_INDEX } from '@styles/z-indexes';
import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import styled from 'styled-components';

export const DeletePageStyles = {
  InfoField: styled.div`
    background-color: ${COLORS.white};
    border-radius: 20px;
    padding: 20px 40px;
    height: auto;
    width: 80%;
    margin: 8px 80px 10px 30px;

    filter: drop-shadow(0px 0px 10px rgba(45, 45, 55, 0.05));

    ${Media.mobile`
    padding: 20px 10px;
    width: 100%;
    margin: 30px 0 0 0 ;
    `}
  `,
  TextBold: styled.div<{ medium?: boolean }>`
    margin-left: 10px;
    color: ${COLORS.black};
    font-family: ${FONTS.family.frutigerNormal};
    font-size: ${({ medium }) =>
      medium ? `${FONTS.sizes[16]}` : `${FONTS.sizes[18]}`};
    font-weight: 700;
    width: 100%;
    margin-bottom: 4px;
  `,
  Text: styled.div<{ medium?: boolean }>`
    margin-left: 10px;
    color: ${COLORS.grey};
    font-family: ${FONTS.family.frutigerNormal};
    font-size: ${({ medium }) =>
      medium ? `${FONTS.sizes[14]}` : `${FONTS.sizes[18]}`};
    font-weight: 400;
    width: 100%;
  `,
  WrapText: styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 30px 50px;

    ${Media.mobile`
    margin: 10px;
    `}
  `,
  CardContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
  `,

  Card: styled.div`
    width: 350px;
    height: 150px;
    border: 1px solid ${COLORS.lightBlue};
    border-radius: 7px;
    background-color: #fff;

    filter: drop-shadow(0px 100px 67px rgba(0, 0, 0, 0.07))
      drop-shadow(0px 48.6528px 46.2072px rgba(0, 0, 0, 0.0510297))
      drop-shadow(0px 29.2707px 26.1414px rgba(0, 0, 0, 0.0432562))
      drop-shadow(0px 18.45px 13.7314px rgba(0, 0, 0, 0.0371871))
      drop-shadow(0px 10.9957px 6.51949px rgba(0, 0, 0, 0.0308146))
      drop-shadow(0px 5.10827px 2.31447px rgba(0, 0, 0, 0.0219847));
  `,
  ButtonWrapper: styled.div`
    display: flex;
    justify-content: space-around;
    height: 42px;
    width: 350px;
    margin-top: 70px;
    z-index: ${Z_INDEX.low};
  `,
  IconWrap: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  `,
  UserInfoContainer: styled.div`
    display: flex;
    align-items: center;
    height: 60px;
    width: auto;
    margin: 10px 20px;
    padding: 0 15px;
  `,
  AvatarWrapper: styled.div`
    width: 60px;
    height: 60px;
    overflow: hidden;
    margin-right: 10px;
    border-radius: 50%;
  `,
  UserDataWrap: styled.div`
    display: block;
  `,

  TabsContainer: styled.div`
    display: flex;
    justify-content: space-around;
    width: 40%;
    height: 40px;
    margin: 50px 0 0 50px;
  `,
  Tabs: styled.div<{ isActive: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 49%;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
    font-family: ${FONTS.family.frutigerNormal};
    font-size: 18px;
    line-height: 22px;

    background-color: ${({ isActive }) =>
      isActive ? `${COLORS.white}` : 'transparent'};
    font-weight: ${({ isActive }) => (isActive ? 700 : 400)};
    box-shadow: ${({ isActive }) =>
      isActive && '0px -10px 20px rgba(45, 45, 55, 0.15);'};
    color: ${({ isActive }) =>
      isActive ? `${COLORS.black}` : `${COLORS.grey}`};
  `,
  Mock: styled.div`
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
