/* eslint-disable @typescript-eslint/no-empty-function */
import { COLORS } from '@styles/colors';

import { ResultButtonsStyled as Styled } from './result-buttons.styles';

export const ResultButtons = (props: { downloadPdf: () => void }) => {
  return (
    <Styled.Root>
      <Styled.Button
        title="Download PDF"
        onClick={props.downloadPdf}
        borderRadius="0"
        color={COLORS.pinkDark}
      />
    </Styled.Root>
  );
};
