import { COLORS } from './../../styles/colors';
import styled from 'styled-components';

export const BreadCrumbStyles = {
  Wrapper: styled.div`
    width: 100%;
    display: flex;
    height: 20px;
    margin-bottom: 15px;
  `,
  CrumbWraper: styled.div<{ isLast?: boolean }>`
    display: flex;
    cursor: ${({ isLast }) => (isLast ? null : 'pointer')};
  `,
  Crumb: styled.div<{ last: boolean }>`
    color: ${({ last }) => (last ? `${COLORS.grey}` : `${COLORS.default}`)};
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    font-style: normal;
  `,
  IconWrap: styled.span`
    margin: 0 10px;
  `,
};