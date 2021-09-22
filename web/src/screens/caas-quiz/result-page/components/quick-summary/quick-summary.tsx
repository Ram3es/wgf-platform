import React from 'react';

import { COLORS } from '@styles/colors';



import { STRINGS } from '@constants/strings';
import { getRowItemsList, headingItemsList, rowList } from './quick-summary.constants';

import { IQuickSummaryProps, IRowListItem, TRowList } from './quick-summary.typings';

import { TitleStyles } from '@styles/components/title-styles';
import { QuickSummaryStyles } from './quick-summary.styles';

export const QuickSummary: React.FC<IQuickSummaryProps> = ({
  results,
  quiz,
}) => {
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
      <TitleStyles.h1 color={COLORS.grey} textAlign="center">
        {STRINGS.resultPage.quickSummaryTextBlock.title}
      </TitleStyles.h1>
      <QuickSummaryStyles.Overflow>
        <QuickSummaryStyles.Content>
          <QuickSummaryStyles.Heading quiz={quiz}>
            <QuickSummaryStyles.HeadingTitle>
              {STRINGS.resultPage.quickSummaryTextBlock.headingTitle}
            </QuickSummaryStyles.HeadingTitle>
            {headingItemsList(results).map(({ imageHead, title, color }, i) => (
              <QuickSummaryStyles.HeadingItem key={i}>
                <img src={imageHead} alt={STRINGS.altLogo} />
                <TitleStyles.h2 color={color}>{title}</TitleStyles.h2>
              </QuickSummaryStyles.HeadingItem>
            ))}
          </QuickSummaryStyles.Heading>
          {rowList.map(({ title, rowName }) => (
            <QuickSummaryStyles.Row key={rowName} quiz={quiz}>
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
      </QuickSummaryStyles.Overflow>
    </QuickSummaryStyles.Wrapper>
  );
};
