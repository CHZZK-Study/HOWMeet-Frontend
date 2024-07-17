import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Sheet } from 'react-modal-sheet';
import { ko } from 'date-fns/locale';
import '../../styles/customDatePicker.css';

const CustomDatePicker: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    setIsStartOpen(false);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    setIsEndOpen(false);
  };

  return (
    <div className="date-picker-wrapper">
      <button onClick={() => setIsStartOpen(true)}>시작일 선택</button>
      <button onClick={() => setIsEndOpen(true)}>종료일 선택</button>

      <div className="date-display">
        <label>시작일: </label>
        {startDate?.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>

      <div className="date-display">
        <label>종료일: </label>
        {endDate?.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>

      <Sheet isOpen={isStartOpen} onClose={() => setIsStartOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div style={{ padding: '1rem' }}>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                locale={ko}
                inline
              />
              <button onClick={() => setIsStartOpen(false)}>완료</button>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>

      <Sheet isOpen={isEndOpen} onClose={() => setIsEndOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div style={{ padding: '1rem' }}>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                locale={ko}
                inline
              />
              <button onClick={() => setIsEndOpen(false)}>완료</button>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
};

export default CustomDatePicker;
