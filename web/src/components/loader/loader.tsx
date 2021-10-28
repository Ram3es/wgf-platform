import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

import { ILoaderProps } from './loader.typings';

import { LoaderStyles } from './loader.styles';

export const Loader: React.FC<ILoaderProps> = ({
  area,
  children,
  isWithoutArea,
}) => {
  const { promiseInProgress } = usePromiseTracker({ area });

  if (!promiseInProgress && !isWithoutArea) {
    return <>{children}</>;
  }

  return (
    <LoaderStyles>
      <svg
        width="51"
        height="51"
        viewBox="0 0 51 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="25.725"
          cy="25.725"
          r="22.725"
          stroke="#8DC63F"
          strokeWidth="5"
        />
        <path
          d="M3 25.7251C3 38.2758 13.1743 48.4501 25.725 48.4501C33.9651 48.4501 41.1808 44.0644 45.1654 37.5"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M3.11243 28C4.25371 39.4825 13.9421 48.4501 25.725 48.4501C33.0968 48.4501 39.6487 44.94 43.8007 39.5"
          stroke="#00AEEF"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </LoaderStyles>
  );
};
