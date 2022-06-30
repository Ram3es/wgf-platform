import { COLORS } from './../../styles/colors';
import styled from 'styled-components';

export const BreadCrumbStyles = {
  Wrapper: styled.div`
    width: 100%;
    display: flex;
    height: 20px;
    margin-bottom: 15px;
  `,
  CrumbWraper: styled.div`
    display: flex;
    cursor: pointer;
  `,
  Crumb: styled.div`
    color: ${COLORS.grey};
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    font-style: normal;
  `,
  IconWrap: styled.span`
    margin: 0 10px;
  `,
};
