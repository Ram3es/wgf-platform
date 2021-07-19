import { FlattenInterpolation, ThemedStyledProps } from 'styled-components';

export type CSS<T = {}> = FlattenInterpolation<ThemedStyledProps<T, any>>;
