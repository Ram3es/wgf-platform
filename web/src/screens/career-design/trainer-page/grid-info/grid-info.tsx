import React, { FC } from 'react';
import {
  IInitialLimitsState,
  limitLabels,
} from '@screens/platform-page/components/edit-page/game-info/game-limits-form';
import { GridInfoStyles as Styled } from './grid-info.styles';

interface IGridInfoProps {
  fieldsValue: IInitialLimitsState | null;
}

export const GridInfo: FC<IGridInfoProps> = ({ fieldsValue }) => {
  const titles = Object.entries(limitLabels);
  return (
    <div>
      <Styled.Grid>
        {titles.map(([key, value]) => (
          <Styled.FieldWrapper key={key}>
            <Styled.Label>{value} </Styled.Label>
            <Styled.Field>
              {fieldsValue?.[key as keyof IInitialLimitsState]}
            </Styled.Field>
          </Styled.FieldWrapper>
        ))}
      </Styled.Grid>
    </div>
  );
};
