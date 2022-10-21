import { FC } from 'react';

import { CommonStylesForTables } from '@screens/platform-page/platform-page.styles';

export const DataColumn: FC<{
  text: string | number;
  isSmallBox?: boolean;
  isMiddleBox?: boolean;
  isWarning?: boolean;
  onClick?: () => void;
  isLink?: boolean;
}> = ({ text, isSmallBox, isMiddleBox, isWarning, isLink, onClick }) => {
  return (
    <CommonStylesForTables.DataColumn
      isSmallBox={isSmallBox}
      isMiddleBox={isMiddleBox}
      isWarning={isWarning}
      isLink={isLink}
    >
      <span onClick={onClick}>{text}</span>
    </CommonStylesForTables.DataColumn>
  );
};
