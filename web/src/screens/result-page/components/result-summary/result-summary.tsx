import React, { useState } from 'react';

import { Question } from '@components/icons';
import { Modal } from '@components/modal';
import { COLORS } from '@styles/colors';

import { IMAGES } from '@constants/images';
import { STRINGS } from '@constants/strings';
import { getCategoriesList, STARS_ICONS } from './results.constants';

import { IResultSummaryProps } from './result-summary.typings';

import { TitleStyles } from '@styles/components/title-styles';
import { ResultSummaryStyles } from './result-summary.styles';

export const ResultSummary: React.FC<IResultSummaryProps> = ({
  results,
  withArchetypesIcon,
}) => {
  const categories = getCategoriesList(results);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const modalOpen = () => setIsOpen(true);

  return (
    <>
      <ResultSummaryStyles.ArchetypesWrapper>
        <TitleStyles.h1 color={COLORS.grey} paddingY="0">
          {STRINGS.resultSummary.title}
        </TitleStyles.h1>
        {withArchetypesIcon && (
          <ResultSummaryStyles.ArchetypesIcon onClick={modalOpen}>
            <Question />
          </ResultSummaryStyles.ArchetypesIcon>
        )}
        {isOpen && (
          <Modal
            text={STRINGS.modalArchetypes.text}
            title={STRINGS.modalArchetypes.title}
            setIsOpen={setIsOpen}
            withBackdrop
            width={400}
          />
        )}
      </ResultSummaryStyles.ArchetypesWrapper>
      <ResultSummaryStyles.CardWrapper>
        {categories.map(
          (
            {
              title,
              imageHead,
              imageBody,
              level,
              score,
              description,
              superPower,
              color,
            },
            i
          ) => (
            <ResultSummaryStyles.CardItem key={i}>
              <ResultSummaryStyles.CardHeading>
                <img src={imageHead} />
                <TitleStyles.h2 color={COLORS.white} paddingY="0">
                  {title}
                </TitleStyles.h2>
              </ResultSummaryStyles.CardHeading>
              <ResultSummaryStyles.CardBody>
                <span>{STRINGS.resultSummary.score}</span>
                <strong>{score}%</strong>
                <img src={imageBody} />
                <ResultSummaryStyles.CardBodyFooter
                  color={COLORS.levelResult[level]}
                >
                  <ResultSummaryStyles.StarWrapper>
                    {STARS_ICONS[level].count.map((item) => (
                      <img src={STARS_ICONS[level].icon} key={item} />
                    ))}
                  </ResultSummaryStyles.StarWrapper>
                  <strong>{level}</strong>
                </ResultSummaryStyles.CardBodyFooter>
                <ResultSummaryStyles.CardDescriprion>
                  <p>{description}</p>
                  <ResultSummaryStyles.SuperPower color={color}>
                    <img src={IMAGES.superPower} alt={STRINGS.altLogo} />
                    Superpower: <strong>{superPower}</strong>
                  </ResultSummaryStyles.SuperPower>
                </ResultSummaryStyles.CardDescriprion>
              </ResultSummaryStyles.CardBody>
            </ResultSummaryStyles.CardItem>
          )
        )}
      </ResultSummaryStyles.CardWrapper>
    </>
  );
};
