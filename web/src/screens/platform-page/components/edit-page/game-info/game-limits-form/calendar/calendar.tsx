import { FC, RefObject, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { CalendarStyles as Styled } from './calendar.styles';

interface ICalendarProps {
  toggleCalendar?: () => void;
  calendarHandler?: (param: string) => void;
  calendarRef?: RefObject<HTMLDivElement>;
}

export const CalendarForm: FC<ICalendarProps> = ({
  toggleCalendar,
  calendarHandler,
  calendarRef,
}) => {
  const [date, onChange] = useState(new Date());
  const minDate = new Date();

  const handleChange = (e: Date | string) => {
    onChange(e as Date);
    const value: string = new Date(e).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }) as string;

    calendarHandler?.(value);
    toggleCalendar?.();
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    e?.stopPropagation();

  return (
    <Styled.Wrapper onClick={handleClick} ref={calendarRef}>
      <Calendar
        value={date}
        onChange={handleChange}
        minDate={minDate}
        locale="en-US"
      />
    </Styled.Wrapper>
  );
};
