import styled, { css } from 'styled-components';

interface IProps {
  color: string;
  value: string;
}

const Root = styled.div<{ color: string }>`
  height: 21px;
  line-height: 18px;
  padding: 1.5px;
  border-width: 1px;
  border-radius: 5px;
  border-style: solid;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ color }) => css`
    color: ${color};
    border-color: ${color};
  `};
`;

export const MBTIOption = (props: IProps) => {
  const { color, value } = props;

  return <Root color={color}>{value}</Root>;
};
