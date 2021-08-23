import styled from 'styled-components';

import { COLORS } from '@styles/colors';

import { IMAGES } from '@constants/images';

export const HeaderStyles = {
  Wrapper: styled.div`
    padding: 25px 0 0;
    display: flex;
  `,

  Text: styled.div`
    padding: 50px 10px 0;

    h2 {
      color: ${COLORS.grey};
      margin-bottom: 20px;
    }

    p {
      width: 500px;
    }
  `,

  CompanyLogo: styled.div`
    margin-left: auto;
    padding: 40px 50px 0 0;
  `,

  ProductLogo: styled.div`
    max-width: 400px;
    padding: 25px 0;
    background-image: url(${IMAGES.bannerPdf});
    background-position: top -40px left -20px;
    background-size: cover;
    background-repeat: no-repeat;
    margin-right: 50px;

    img {
      padding: 23px 50px 12px;
    }

    h1 {
      padding: 0px 50px 55px;
      color: ${COLORS.greenLite};
    }
  `,
};
