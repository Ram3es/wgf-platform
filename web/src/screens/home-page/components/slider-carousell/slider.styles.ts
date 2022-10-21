import styled from 'styled-components';
import Slider from 'react-slick';

import { Media } from '@styles/media';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { COLORS } from '@styles/colors';

export const SliderPageStyles = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    max-width: 540px;
    align-items: center;
    position: relative;

    ${Media.mobile`
    width: 300px;
    `}
  `,
};

export const StyledSlyder = styled(Slider)`
  .slick-list {
    position: relative;
    height: 610px;
    max-width: 540px;

    ${Media.mobile`
    max-width: 360px;
    height:520px;
    `}
  }
  .slick-dots li button:before {
    opacity: 0.5;
    color: ${COLORS.yellow} !important;
    background: ${COLORS.yellow};
    width: 14px !important;
    height: 14px !important;
    border-radius: 7px;
  }
  .slick-dots {
    ${Media.mobile`
    bottom: 0px !important;
    `}
  }

  .slick-dots li.slick-active button:before {
    width: 14px !important;
    height: 14px !important;
    background: ${COLORS.yellow};
    opacity: 1;
    border-radius: 7px !important;
  }
  .slick-slide.slick-active {
    z-index: 999;
  }
`;
