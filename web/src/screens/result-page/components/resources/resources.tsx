import React from 'react';

import { COLORS } from '@styles/colors';

import { STRINGS } from '@constants/strings';

import { TitleStyles } from '@styles/components/title-styles';
import { ResourcesStyles } from './resources.styles';

export const Resources: React.FC = () => {
  return (
    <>
      <TitleStyles.h1 paddingY="20px" color={COLORS.grey}>
        {STRINGS.resultPage.resourcesTextBlock.title}
      </TitleStyles.h1>
      <ResourcesStyles.TextBlock>
        <ResourcesStyles.List>
          {STRINGS.resultPage.resourcesTextBlock.textList.map((item, i) => (
            <ResourcesStyles.ListItem key={i}>{item}</ResourcesStyles.ListItem>
          ))}
        </ResourcesStyles.List>
      </ResourcesStyles.TextBlock>
    </>
  );
};
