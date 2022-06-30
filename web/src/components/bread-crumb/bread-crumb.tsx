import { Icon } from '@components/icon';

import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BreadCrumbTitle } from './bread-crumb.constants';
import { BreadCrumbStyles as Styled } from './bread-crumb.styles';

export const BreadCrumb = () => {
  const { pathname } = useLocation<Location>();
  const { replace } = useHistory();
  const crumbs = pathname.slice(1, pathname.length).split('/');

  const pathCrumb = (crumb: string) => {
    let path = '';
    let currenPath = '';
    crumbs.forEach((item) => {
      path = `${path}/${item}`;

      if (crumb === item) {
        currenPath = path;
      }
    });

    return currenPath;
  };

  const handleCrumb = (crumb: string) => {
    replace(pathCrumb(crumb));
  };

  return (
    <Styled.Wrapper>
      {crumbs.map((crumb, idx) => {
        const title = BreadCrumbTitle[crumb];
        return (
          <React.Fragment key={idx}>
            <Styled.CrumbWraper onClick={() => handleCrumb(crumb)}>
              <Styled.Crumb>{title}</Styled.Crumb>
            </Styled.CrumbWraper>
            {!(crumbs.length - 1 === idx) && (
              <Styled.IconWrap>
                <Icon type="triangleBreacket" />
              </Styled.IconWrap>
            )}
          </React.Fragment>
        );
      })}
    </Styled.Wrapper>
  );
};
