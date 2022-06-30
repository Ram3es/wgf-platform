import { Icon } from '@components/icon';

import React, { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BreadCrumbTitle } from './bread-crumb.constants';
import { BreadCrumbStyles as Styled } from './bread-crumb.styles';

interface IBreadCrumb {
  props?: string | null;
}

export const BreadCrumb: FC<IBreadCrumb> = ({ props }) => {
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
  const handleCrumbClick = (last: boolean, crumb: string) => {
    !last && handleCrumb(crumb);
  };

  return (
    <Styled.Wrapper>
      {crumbs.map((crumb, idx) => {
        const title = BreadCrumbTitle[crumb] || props;
        const lastPath = Boolean(crumbs.length - 1 === idx);

        return (
          <React.Fragment key={idx}>
            <Styled.CrumbWraper
              isLast={lastPath}
              onClick={() => {
                handleCrumbClick(lastPath, crumb);
              }}
            >
              <Styled.Crumb last={lastPath}>{title}</Styled.Crumb>
            </Styled.CrumbWraper>
            {!lastPath && (
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
