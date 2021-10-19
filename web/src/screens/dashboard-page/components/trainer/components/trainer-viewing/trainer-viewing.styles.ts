import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';

export const TrainerViewingStyled = {
  Wrapper: styled.div`
    position: relative;
    margin-bottom: 50px;
  `,
  Title: styled.div`
    h2 {
      font-family: ${FONTS.family.absideSmooth};
      font-weight: 400;
    }
    margin-bottom: 25px;
  `,
  Cards: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `,
  CardWrapper: styled.div`
    flex: 1 1 auto;
    max-width: 450px;
    min-width: 335px;
    padding: 10px;
  `,
  CardItem: styled.div`
    border-radius: 20px;
    background-color: ${COLORS.white};
  `,
  CardHeader: styled.div`
    position: relative;
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  CardTrainerName: styled.div`
    position: relative;
    display: flex;
    padding: 20px 0 20px 30%;
  `,
  AvatarWrapper: styled.div`
    position: absolute;
    top: 0;
    left: 30px;
    width: 50px;
    height: 50px;
  `,
  CardTrainerInfoItem: styled.div`
    border-top: 1px solid ${COLORS.grey};
    font-size: ${FONTS.sizes[14]};
    color: ${COLORS.grey};
    padding: 10px 10px 10px 30%;
  `,
  OptionsWrapper: styled.div`
    position: absolute;
    right: -10px;
    width: 217px;
  `,
  Icon: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 30px;
    height: 30px;
    margin-right: -15px;
  `,
};

export const DisconnectPopUpStyled = {
  Header: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      font-family: ${FONTS.family.absideSmooth};
      font-weight: 400;
      margin-left: 5px;
    }
  `,

  Description: styled.div`
    text-align: center;
    margin-bottom: 30px;

    p {
      color: ${COLORS.grey};
      font-size: ${FONTS.sizes[16]};
    }
  `,
  ButtonPanel: styled.div`
    display: flex;
    justify-content: space-between;

    & > :first-child {
      margin-right: 20px;
    }
  `,
};
