import { FONTS } from './../../styles/fonts';
import { Media } from '@styles/media';
import styled from 'styled-components';

export const FooterStyles = {
  Container: styled.div`
    display: flex;
    background-color: white;

    padding: 10px 82px;
    ${Media.landscape`
     padding:20px 30px
    `}

    ${Media.mobile`
     padding:10px 10px
    `}
    @media
      print {
      display: none;
    }
  `,
  WrapImages: styled.div`
    display: flex;
    align-items: center;
    width: 50%;

    ${Media.mobile`
    display: block;
   
    `}
  `,
  WrapText: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
  `,
  TextTitle: styled.div`
    text-align: center;
    margin-bottom: 5px;
    font-size: ${FONTS.sizes[18]};
    font-family: ${FONTS.family.frutigerNormal};

    ${Media.mobile`
    font-size: 16px;
    `}
  `,

  LinkTextWrap: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  LinkText: styled.a`
    margin-bottom: 5px;
    font-size: ${FONTS.sizes[18]};
    font-family: ${FONTS.family.frutigerNormal};
    text-align: center;
    color: #46ace2;

    :visited {
      color: #46ace2;
    }

    :hover {
      color: #236fe0;
      opacity: 1;
    }
    ${Media.mobile`
    font-size: 16px;
    `}
  `,

  Logo: styled.div`
    display: flex;
  `,

  Social: styled.div`
    width: 160px;
    display: flex;
    justify-content: space-between;
    margin-left: 80px;
    cursor: pointer;

    ${Media.landscape`
    margin-left: 40px;
    `}

    ${Media.landscape`
    margin: 15px 0 0 0;
    `}
  `,

  MailIconWrapper: styled.div`
    width: 40px;
    height: 40px;
  `,
};
