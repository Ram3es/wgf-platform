import React, { useEffect, useState } from 'react';

import { Icon } from '@components/icon';
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
  quiz,
}) => {
  const categories = getCategoriesList(results);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const modalOpen = () => setIsOpen(true);

  const modalClose = () => setIsOpen(false);

  useEffect(() => {
    const body = document.querySelector('body');

    if (isOpen) {
      return body?.classList.add('hidden');
    }

    body?.classList.remove('hidden');
  }, [isOpen]);

  return (
    <>
      <ResultSummaryStyles.ArchetypesWrapper>
        <TitleStyles.h1 color={COLORS.grey}>
          {STRINGS.resultSummary.title}
        </TitleStyles.h1>
        {withArchetypesIcon && (
          <ResultSummaryStyles.ArchetypesIcon onClick={modalOpen}>
            <Icon type="question" />
          </ResultSummaryStyles.ArchetypesIcon>
        )}
        {isOpen && (
          <Modal onClose={modalClose} withBackdrop width={400}>
            <TitleStyles.h2 color={COLORS.grey} mb={20}>
              {STRINGS.archetypesModal.title}
            </TitleStyles.h2>
            {STRINGS.archetypesModal.description.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </Modal>
        )}
      </ResultSummaryStyles.ArchetypesWrapper>
      <ResultSummaryStyles.CardWrapper quiz={quiz}>
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
              colorTitle,
            },
            i
          ) => (
            <ResultSummaryStyles.CardItem key={i} quiz={quiz}>
              <ResultSummaryStyles.CardHeading>
                <img src={imageHead} />
                <TitleStyles.h2 color={colorTitle}>{title}</TitleStyles.h2>
              </ResultSummaryStyles.CardHeading>
              <ResultSummaryStyles.CardBody quiz={quiz}>
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
                  <ResultSummaryStyles.SuperPower>
                    <img src={IMAGES.superPower} alt={STRINGS.altLogo} />
                    <span>{STRINGS.resultSummary.superPower}</span>
                    <strong>{superPower}</strong>
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
