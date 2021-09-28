import styled from 'styled-components';

export const LoaderStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    animation: ring 1.2s linear infinite;
  }

  @keyframes ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
