import { FC } from 'react';

import { CommonStylesForTables } from '@screens/platform-page/platform-page.styles';

export const HeaderColumn: FC<{
  text: string;
  isSmallBox?: boolean;
  isMiddleBox?: boolean;
  color?: string;
  fontColor?: string;
}> = ({ text, isSmallBox, isMiddleBox, color, fontColor }) => {
  return (
    <CommonStylesForTables.HeaderColumn
      isSmallBox={isSmallBox}
      isMiddleBox={isMiddleBox}
      color={color}
      fontColor={fontColor}
    >
      {text}
    </CommonStylesForTables.HeaderColumn>
  );
};
