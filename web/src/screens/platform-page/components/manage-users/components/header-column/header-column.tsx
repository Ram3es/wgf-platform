import { FC } from 'react';

import { CommonStylesForTables } from '@screens/platform-page/platform-page.styles';

export const HeaderColumn: FC<{
  text: string;
  isSmallBox?: boolean;
  isMiddleBox?: boolean;
  color?: string;
}> = ({ text, isSmallBox, isMiddleBox, color }) => {
  return (
    <CommonStylesForTables.HeaderColumn
      isSmallBox={isSmallBox}
      isMiddleBox={isMiddleBox}
      color={color}
    >
      {text}
    </CommonStylesForTables.HeaderColumn>
  );
};
