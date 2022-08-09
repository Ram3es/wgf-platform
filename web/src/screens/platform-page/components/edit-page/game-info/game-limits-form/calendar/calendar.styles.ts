import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import { Z_INDEX } from '@styles/z-indexes';
import styled from 'styled-components';
export const CalendarStyles = {
  Wrapper: styled.div`
    position: absolute;
    max-width: 330px;
    height: auto;
    margin: auto;
    padding: 10px;
    border-radius: 20px;
    z-index: ${Z_INDEX.low};
    top: 75px;
    right: 0px;

    ${Media.mobile`
   right:-10%;
    `}

    .react-calendar {
      width: 330px;
      max-width: 100%;
      background: white;
      border: 4px solid white;
      border-radius: 8px;
      font-size: ${FONTS.sizes[18]};
      font-family: ${FONTS.family.frutigerBold};
      color: ${COLORS.violet};
    }
    .react-calendar__navigation button:disabled {
      border-radius: 10px;
      margin-left: 1px;
    }
    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
      background-color: #bbb6dd;
      border-radius: 10px;
    }

    .react-calendar__month-view__weekdays {
      text-align: center;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 0.75em;
    }
    .react-calendar__tile:disabled {
      background-color: #f0f0f0;
      border-radius: 50%;
    }

    .react-calendar__tile--active {
      background: ${COLORS.violet};
      color: white;
      border-radius: 50%;
    }
    .react-calendar__month-view__days__day {
      font-size: ${FONTS.sizes[16]};
      padding: 12px 0;
    }

    .react-calendar__month-view__days__day--weekend {
      color: #d10000;
    }
    .react-calendar__month-view__days__day--neighboringMonth {
      color: #c8c8c8;
    }

    .react-calendar__navigation__label__labelText {
      font-size: ${FONTS.sizes[16]};
      font-weight: bold;
    }
    .react-calendar__tile--hasActive {
      background: ${COLORS.violet};
    }

    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
      background-color: #bbb6dd;
      border-radius: 50%;
    }
    .react-calendar__tile {
      font-size: ${FONTS.sizes[15]};
      margin: 1px 0;
    }

    .react-calendar__tile--hasActive {
      background: ${COLORS.violet};
      border-radius: 50%;
      color: white;
      font-size: ${FONTS.sizes[18]};
    }

    abbr[title] {
      text-decoration: none;
      text-align: center;
    }

    .react-calendar__year-view .react-calendar__tile {
      padding: 40px 15px;
    }
    .react-calendar__decade-view .react-calendar__tile {
      padding: 40px 15px;
    }
    .react-calendar__century-view .react-calendar__tile {
      padding: 33px 10px;
    }

    .react-calendar__navigation {
      display: flex;
      height: 38px;
      margin-bottom: 1em;
    }
    .react-calendar__navigation button {
      margin-top: 5px;
      min-width: 38px;
      min-height: 38px;
    }

    .react-calendar__navigation__arrow {
      font-size: ${FONTS.sizes[20]};
      font-weight: bold;
    }
    .react-calendar__navigation__next2-button,
    .react-calendar__navigation__next-button,
    .react-calendar__navigation__prev-button,
    .react-calendar__navigation__prev2-button {
      box-shadow: 0 2px 7px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      margin: 0 2px;
    }
  `,
};
