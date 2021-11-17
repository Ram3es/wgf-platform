/* eslint-disable @typescript-eslint/no-empty-function */
import { COLORS } from '@styles/colors';

import { ResultButtonsStyled as Styled } from './result-buttons.styles';

export const ResultButtons = () => {
  return (
    <Styled.Root>
      <Styled.Button
        title="Download PDF"
        onClick={() => {}}
        borderRadius="0"
        color={COLORS.pinkDark}
      />
    </Styled.Root>
  );
};
