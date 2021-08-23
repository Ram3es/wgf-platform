import React from 'react';

import { COLORS } from '@styles/colors';

import { STRINGS } from '@constants/strings';
import { getRowItemsList, headingItemsList } from './glance.constants';

import { IGlanceProps } from './glance.typings';

import { TitleStyles } from '@styles/components/title-styles';
import { GlanceStyles } from './glance.styles';

export const Glance: React.FC<IGlanceProps> = ({ results }) => {
  const rowItems = getRowItemsList(results);

  return (
    <GlanceStyles.Wrapper>
      <TitleStyles.h1 color={COLORS.grey} textAlign="center" paddingY="20px">
        {STRINGS.resultPage.glanceTextBlock.title}
      </TitleStyles.h1>
      <GlanceStyles.Content>
        <GlanceStyles.Heading>
          <GlanceStyles.HeadingTitle>
            {STRINGS.resultPage.glanceTextBlock.headingTitle}
          </GlanceStyles.HeadingTitle>
          {headingItemsList.map(({ imageHead, title }, i) => (
            <GlanceStyles.HeadingItem key={i}>
              <img src={imageHead} alt={STRINGS.altLogo} />
              <TitleStyles.h2 color={COLORS.white} paddingY="0px">
                {title}
              </TitleStyles.h2>
            </GlanceStyles.HeadingItem>
          ))}
        </GlanceStyles.Heading>
        <GlanceStyles.Row>
          <GlanceStyles.RowItem>
            <strong>Your superpower is:</strong>
          </GlanceStyles.RowItem>
          {rowItems.map(({ superPower, color }, i) => (
            <GlanceStyles.RowItem color={color} key={i}>
              <strong>{superPower}</strong>
            </GlanceStyles.RowItem>
          ))}
        </GlanceStyles.Row>
        <GlanceStyles.Row>
          <GlanceStyles.RowItem>
            <strong>Answers the question:</strong>
          </GlanceStyles.RowItem>
          {rowItems.map(({ question }, i) => (
            <GlanceStyles.RowItem key={i}>
              <p>{question}</p>
            </GlanceStyles.RowItem>
          ))}
        </GlanceStyles.Row>
        <GlanceStyles.Row>
          <GlanceStyles.RowItem>
            <strong>Your self-assessment:</strong>
          </GlanceStyles.RowItem>
          {rowItems.map(({ level }, i) => (
            <GlanceStyles.RowItem key={i} color={COLORS.levelResult[level]}>
              <strong>{level}</strong>
            </GlanceStyles.RowItem>
          ))}
        </GlanceStyles.Row>
        <GlanceStyles.Row>
          <GlanceStyles.RowItem>
            <strong>What you can do:</strong>
          </GlanceStyles.RowItem>
          {rowItems.map(({ description }, i) => (
            <GlanceStyles.RowItem key={i}>
              <p>{description}</p>
            </GlanceStyles.RowItem>
          ))}
        </GlanceStyles.Row>
        <GlanceStyles.Row>
          <GlanceStyles.RowItem>
            <strong>Maps to the Career Adaptability Scale</strong>
          </GlanceStyles.RowItem>
          {rowItems.map(({ category }, i) => (
            <GlanceStyles.RowItem key={i}>
              <p>{category}</p>
            </GlanceStyles.RowItem>
          ))}
        </GlanceStyles.Row>
      </GlanceStyles.Content>
    </GlanceStyles.Wrapper>
  );
};
