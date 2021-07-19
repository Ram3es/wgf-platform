import React from 'react';
import styled from 'styled-components';

import { Media } from '@styles/media';

export const BannerImageStyles = styled.div`
  position: absolute;
  right: 54%;
  bottom: 100%;
  margin-bottom: -300px;
  width: 46%;
  min-width: 620px;

  ${Media.smallLandscape`
      width: 100%;
      top: 0;
      left: 0;
      min-width: auto;
  `}

  ${Media.mobile`
      top: 40px;
  `}

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const BannerImage: React.FC = () => (
  <BannerImageStyles>
    <svg
      width="375"
      height="244"
      viewBox="0 0 375 244"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M311.668 83.8837C247.993 78.1928 219.501 91.3124 163.046 83.3931C107.11 75.5492 90.0338 47.3612 75.9958 37.5991C55.0634 23.0613 38.1564 1.16418 9.29356 0.696717C1.69356 0.607842 -27.1206 -1.79943 -39.6332 19.7536C-48.1086 34.4239 -46.2849 44.6756 -45.6661 62.2502C-45.0221 81.3844 -25.8782 103.429 -16.0515 118.642C-0.642608 142.506 12.7793 167.465 34.2304 186.386C59.2079 202.271 92.0683 219.897 154.88 221.489C211.315 222.92 238.726 251.721 302.024 240.628C364.462 229.673 386.63 163.874 368.179 124.123C359.665 105.763 338.478 86.2849 311.668 83.8837Z"
        fill="url(#paint0_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="267.004"
          y1="226.256"
          x2="50.1092"
          y2="21.0171"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8DC63F" />
          <stop offset="0.708333" stopColor="#00A651" />
          <stop offset="1" stopColor="#8DC63F" />
        </linearGradient>
      </defs>
    </svg>
  </BannerImageStyles>
);
