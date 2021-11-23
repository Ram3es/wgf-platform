import { useHistory } from 'react-router';

import { COLORS } from '@styles/colors';

/* eslint-disable @typescript-eslint/no-empty-function */
import { ROUTES } from '@constants/routes';

import { ResultButtonsStyled as Styled } from './result-buttons.styles';

export const ResultButtons = (props: { downloadPdf: () => void }) => {
  const { push } = useHistory();

  const handleClick = () => {
    push(ROUTES.main);
  };

  return (
    <Styled.Root>
      <Styled.Button
        title="Download PDF"
        onClick={props.downloadPdf}
        borderRadius="0"
        color={COLORS.redDark}
      />
      <Styled.Button
        title="WitGritFit Home"
        onClick={handleClick}
        borderRadius="0"
        color={COLORS.redDark}
        variant="underline"
      />
    </Styled.Root>
  );
};
