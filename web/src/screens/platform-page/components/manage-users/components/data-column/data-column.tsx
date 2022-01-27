import { FC } from 'react';

import { CommonStylesForTables } from '@screens/platform-page/platform-page.styles';

export const DataColumn: FC<{
  text: string | number;
  isSmallBox?: boolean;
  isMiddleBox?: boolean;
  isWarning?: boolean;
}> = ({ text, isSmallBox, isMiddleBox, isWarning }) => {
  return (
    <CommonStylesForTables.DataColumn
      isSmallBox={isSmallBox}
      isMiddleBox={isMiddleBox}
      isWarning={isWarning}
    >
      {text}
    </CommonStylesForTables.DataColumn>
  );
};
