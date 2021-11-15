import { StylesConfig } from 'react-select';
import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';

import { Z_INDEX } from '@constants/z-indexes';

import { ISelectOption } from './select.typings';

export const selectCustomStyles = (
  error?: string
): StylesConfig<ISelectOption, true> => ({
  control: (provided) => ({
    ...provided,
    backgroundColor: COLORS.white,
    borderColor: error ? COLORS.red : 'transparent',
    borderRadius: '8px',
    borderStyle: 'solid',
    borderWidth: '1px',
    boxShadow: '0 0 10px 2px rgb(0 0 0 / 10%)',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '2px',
    paddingRight: '10px',
    cursor: 'pointer',
    ':hover': {
      boxShadow: error
        ? '0px 4px 15px rgba(223, 0, 3, 0.2)'
        : '0px 6px 17px rgba(0, 0, 0, 0.2)',
      borderColor: error ? COLORS.red : 'transparent',
      borderRadius: '8px',
      borderStyle: 'solid',
    },
  }),
  option: (provided) => ({
    ...provided,
    cursor: 'pointer',

    '@media (max-width: 600px)': {
      fontSize: FONTS.sizes[15],
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: error ? COLORS.red : COLORS.grey,
    fontWeight: 400,
    fontFamily: FONTS.family.frutigerNormal,

    '@media (max-width: 600px)': {
      fontSize: FONTS.sizes[15],
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    padding: '5px',
    backgroundColor: COLORS.white,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: COLORS.greyLite,
    color: COLORS.grey,

    '@media (max-width: 600px)': {
      padding: '3px',
      fontSize: FONTS.sizes[15],
    },
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: COLORS.grey,
    fontFamily: FONTS.family.frutigerNormal,
  }),
  clearIndicator: (provided) => ({
    ...provided,
    '@media (max-width: 600px)': {
      padding: '3px',
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    '@media (max-width: 600px)': {
      padding: '3px',
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    '@media (max-width: 600px)': {
      padding: '3px',
    },
  }),
});

export const SelectStyled = {
  Wrapper: styled.div`
    position: relative;
    margin-bottom: 25px;
  `,
  Label: styled.span<{ error?: string }>`
    display: inline-block;
    margin-bottom: 10px;
    color: ${({ error }) => (error ? COLORS.red : COLORS.default)};
  `,
  ErrorBlock: styled.div`
    position: absolute;
    top: 100%;
    padding: 7px 0;
    color: ${COLORS.red};
    font-size: ${FONTS.sizes[14]};
    font-weight: 400;
    border-radius: 5px;
    z-index: ${Z_INDEX.low};
  `,
};
