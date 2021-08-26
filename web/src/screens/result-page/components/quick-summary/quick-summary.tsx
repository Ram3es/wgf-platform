import React from 'react';

import { COLORS } from '@styles/colors';

import { STRINGS } from '@constants/strings';
import { getRowItemsList, headingItemsList, rowList } from './quick-summary.constants';

import { IQuickSummaryProps, IRowListItem, TRowList } from './quick-summary.typings';

import { TitleStyles } from '@styles/components/title-styles';
import { QuickSummaryStyles } from './quick-summary.styles';

export const QuickSummary: React.FC<IQuickSummaryProps> = ({ results }) => {
  const rowItems = getRowItemsList(results);

  const getCurrentRowItem = (rowName: TRowList, item: IRowListItem) => {
    switch (rowName) {
      case 'level':
        return (
          <QuickSummaryStyles.TitleStrong
            color={COLORS.levelResult[item.level]}
          >
            {item.level}
          </QuickSummaryStyles.TitleStrong>
        );
      case 'superPower':
        return (
          <QuickSummaryStyles.TitleStrong color={COLORS.default}>
            {item.superPower}
          </QuickSummaryStyles.TitleStrong>
        );
      default:
        return <p>{item[rowName]}</p>;
    }
  };

  return (
    <QuickSummaryStyles.Wrapper>
      <TitleStyles.h1 color={COLORS.grey} textAlign="center" paddingY="20px">
        {STRINGS.resultPage.quickSummaryTextBlock.title}
      </TitleStyles.h1>
      <QuickSummaryStyles.Content>
        <QuickSummaryStyles.Heading>
          <QuickSummaryStyles.HeadingTitle>
            {STRINGS.resultPage.quickSummaryTextBlock.headingTitle}
          </QuickSummaryStyles.HeadingTitle>
          {headingItemsList.map(({ imageHead, title, color }, i) => (
            <QuickSummaryStyles.HeadingItem key={i}>
              <img src={imageHead} alt={STRINGS.altLogo} />
              <TitleStyles.h2 color={color} paddingY="0px">
                {title}
              </TitleStyles.h2>
            </QuickSummaryStyles.HeadingItem>
          ))}
        </QuickSummaryStyles.Heading>
        {rowList.map(({ title, rowName }) => (
          <QuickSummaryStyles.Row key={rowName}>
            <QuickSummaryStyles.RowItem>
              <QuickSummaryStyles.TitleStrong>
                {title}
              </QuickSummaryStyles.TitleStrong>
            </QuickSummaryStyles.RowItem>
            {rowItems.map((item, i) => (
              <QuickSummaryStyles.RowItem key={i}>
                {getCurrentRowItem(rowName, item)}
              </QuickSummaryStyles.RowItem>
            ))}
          </QuickSummaryStyles.Row>
        ))}
      </QuickSummaryStyles.Content>
    </QuickSummaryStyles.Wrapper>
  );
};
