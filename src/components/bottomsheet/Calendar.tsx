import Calendar from 'react-calendar';
import styled, { css } from 'styled-components';
import PrevIcon from 'public/assets/icons/common/prev.svg';
import NextIcon from 'public/assets/icons/common/next.svg';
import moment from 'moment';
import { useState } from 'react';

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

interface Props {
  $isOver?: boolean;
  onChange: (value: string) => void;
}

function CalendarComponent({ $isOver = false, onChange }: Props) {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  const handleOnChange = (date: SelectedDate) => {
    setSelectedDate(date);
    onChange(moment(String(date)).format('YYYY-MM-DD'));
  };

  return (
    <StyledCalendar
      next2Label={null}
      prev2Label={null}
      onChange={(date) => handleOnChange(date)}
      value={selectedDate}
      prevLabel={<img className="icon" src={PrevIcon} alt="prev" />}
      nextLabel={<img className="icon" src={NextIcon} alt="prev" />}
      calendarType="gregory"
      formatDay={(_, date) => moment(date).format('DD')}
      showNeighboringMonth={false}
      $isOver={$isOver}
    />
  );
}

const StyledCalendar = styled(Calendar)<{ $isOver: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  margin-bottom: 20%;

  .icon {
    width: 24px;
    height: 24px;
  }

  .react-calendar__navigation {
    width: 100%;
    position: relative;
  }

  .react-calendar__navigation__label__labelText {
    ${({ theme }) => theme.typo.body.semi_bold[18]};
    color: ${({ theme }) => theme.color.secondary.solid.bk[900]};
  }

  .react-calendar__navigation__prev-button {
    position: absolute;
    right: 75px;
  }

  .react-calendar__navigation__next-button {
    position: absolute;
    right: 20px;
  }

  .react-calendar__month-view {
    display: flex;
    flex-direction: column;
    gap: 14px;

    abbr[title] {
      text-decoration: none;
    }
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    margin: 20px 0;
  }

  .react-calendar__tile {
    height: 57px;
    border-radius: 100%;

    color: ${({ theme }) => theme.color.secondary.solid.bk[900]};
    ${({ theme }) => theme.typo.body.regular[16]}
  }

  .react-calendar__tile--now {
    color: ${({ theme }) => theme.color.secondary.solid.green[1]};
  }

  .react-calendar__tile--active {
    ${({ theme, $isOver }) => {
      if ($isOver) {
        return css`
          background: ${theme.color.primary.white};
          color: ${theme.color.secondary.solid.red.red};
          border: 1px dashed ${theme.color.secondary.solid.red.red};
        `;
      }
      return css`
        background: ${theme.color.secondary.solid.green[1]};
        color: ${theme.color.primary.white};
      `;
    }}
  }
`;

export default CalendarComponent;
