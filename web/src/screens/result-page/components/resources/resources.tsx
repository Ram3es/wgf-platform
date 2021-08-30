import parse from 'html-react-parser';
import React from 'react';

import { COLORS } from '@styles/colors';

import { STRINGS } from '@constants/strings';

import { TitleStyles } from '@styles/components/title-styles';
import { ResourcesStyles } from './resources.styles';

export const Resources: React.FC = () => {
  return (
    <ResourcesStyles.Wrapper>
      <TitleStyles.h1 color={COLORS.grey}>
        {STRINGS.resultPage.resourcesTextBlock.title}
      </TitleStyles.h1>
      <ResourcesStyles.TextBlock>
        <ResourcesStyles.List>
          {STRINGS.resultPage.resourcesTextBlock.textList.map((item, i) => (
            <ResourcesStyles.ListItem key={i}>
              {parse(item)}
            </ResourcesStyles.ListItem>
          ))}
        </ResourcesStyles.List>
      </ResourcesStyles.TextBlock>
    </ResourcesStyles.Wrapper>
  );
};
