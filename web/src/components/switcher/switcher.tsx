import React, { FC } from 'react';
import Switch from 'react-switch';

import { COLORS } from '@styles/colors';

export const Switcher: FC<{
  isChecked: boolean;
  handleChange: (checked: boolean) => void;
}> = ({ isChecked, handleChange }) => {
  return (
    <div>
      <Switch
        checked={isChecked}
        onChange={handleChange}
        onColor={COLORS.blue}
        onHandleColor={COLORS.liteBlue}
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={20}
        width={48}
        className="react-switch"
        id="material-switch"
      />
    </div>
  );
};
