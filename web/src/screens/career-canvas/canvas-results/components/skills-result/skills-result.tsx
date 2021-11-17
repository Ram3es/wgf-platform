import { Fragment } from 'react';
import { IResultQuestion } from '../../canvas-results.typing';
import { ResultPage } from '../common';

import { SkillsResultStyled as Styled } from './skills-result.styles';

interface IProps {
  criticalSkills: IResultQuestion[];
  technicalSkills: IResultQuestion[];
}

export const SkillsResult = (props: IProps) => {
  const { criticalSkills, technicalSkills } = props;

  return (
    <ResultPage header={{ title: 'My SKILLS' }} isFullHeight>
      <Styled.HeightContainer>
        <Styled.CriticalSkillsSection>
          <p>Core critical skills</p>
          <Styled.List>
            {criticalSkills.map(({ title, value }) => (
              <div key={title}>
                <dt>{title}</dt>
                <Styled.SkillAnswer>{value}</Styled.SkillAnswer>
              </div>
            ))}
          </Styled.List>
        </Styled.CriticalSkillsSection>

        <div>
          {technicalSkills.map(({ title, value }) => (
            <Fragment key={title}>
              <p>{title}</p>
              <Styled.TechnicalSkillsAnswer>
                {value}
              </Styled.TechnicalSkillsAnswer>
            </Fragment>
          ))}
        </div>
      </Styled.HeightContainer>
    </ResultPage>
  );
};
