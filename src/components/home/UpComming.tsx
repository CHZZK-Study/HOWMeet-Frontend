import { Badge } from '@/styles/components/badge';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import moment from 'moment';
import { useState } from 'react';
import styled from 'styled-components';

const mockSchedules = [
  {
    badge: 'D-Day',
    title: '개발자 전체회의 일정',
    room: '취지직 방',
    date: '2024. 07. 05 12:00~16:00',
  },
  {
    badge: 'D-Day',
    title: '개발자 전체회의 일정2',
    room: '취지직 방',
    date: '2024. 07. 05 12:00~16:00',
  },
  {
    badge: 'D-Day',
    title: '개발자 전체회의 일정3',
    room: '취지직 방',
    date: '2024. 07. 05 12:00~16:00',
  },
];

interface Props {
  schedules: {
    roomId: string;
    roomName: string;
    scheduleId: string;
    scheduleName: string;
    confirmDate: Date;
    startTime: string;
    endTime: string;
    status: string;
    dateDiff: number;
  }[];
}

function UpComming({ schedules }: Props) {
  const [visible, setVisible] = useState(0);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < 100) {
      setVisible((prev) => (prev < mockSchedules.length - 1 ? prev + 1 : prev));
    } else if (info.offset.x > -100) {
      setVisible((prev) => (prev > 0 ? prev - 1 : prev));
    }
  };

  return (
    <UpCommingList>
      <AnimatePresence>
        {schedules.map(
          (item, index) =>
            visible === index && (
              <UpCommingItem
                key={index}
                drag
                dragConstraints={{
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
                onDragEnd={handleDragEnd}
              >
                <StyledBadge>D-{item.dateDiff}</StyledBadge>
                <ItemTitle>
                  {item.scheduleName}
                  <div className="underline" />
                </ItemTitle>
                <ItemDesc>
                  <h3 className="name">{item.roomName}</h3>
                  <div className="devider" />
                  <p className="date">
                    {moment(item.confirmDate).format('YYYY-MM-DD')}{' '}
                    {item.startTime.slice(0, -3)}~{item.endTime.slice(0, -3)}
                  </p>
                </ItemDesc>
              </UpCommingItem>
            )
        )}
      </AnimatePresence>
      <StepWrapper>
        {schedules.map((index) => (
          <Dot $isSelect={visible === Number(index)} />
        ))}
      </StepWrapper>
    </UpCommingList>
  );
}

const UpCommingList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
`;

const UpCommingItem = styled(motion.li)`
  width: 100%;
  padding: 17px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  border-radius: 15px;
  background: ${({ theme }) => theme.color.primary.white};

  box-shadow: 0px 4px 10px 0px rgba(90, 90, 90, 0.1);

  cursor: grab;
`;

const StyledBadge = styled(Badge)`
  background: rgba(255, 98, 126, 0.1);
  color: rgba(255, 98, 126, 1);
`;

const ItemTitle = styled.div`
  position: relative;

  ${({ theme }) => theme.typo.body.semi_bold[20]};
  color: ${({ theme }) => theme.color.secondary.solid.bk[900]};

  .underline {
    position: absolute;
    top: 20px;
    width: calc(100% + 5px);
    height: 10px;
    background: rgba(65, 211, 53, 0.2);
  }
`;

const ItemDesc = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  .devider {
    width: 1px;
    height: 12px;
    background: ${({ theme }) => theme.color.secondary.solid.bk[500]};
  }
  .name {
    ${({ theme }) => theme.typo.body.semi_bold[12]};
    color: ${({ theme }) => theme.color.secondary.solid.bk[900]};
  }
  .date {
    ${({ theme }) => theme.typo.body.regular[12]};
    color: ${({ theme }) => theme.color.secondary.solid.bk[700]};
  }
`;

const StepWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const Dot = styled.div<{ $isSelect: boolean }>`
  width: 8px;
  height: 8px;
  background: ${({ theme, $isSelect }) =>
    $isSelect
      ? theme.color.point.green
      : theme.color.secondary.solid.gray[800]};
  border-radius: 100%;
`;

export default UpComming;
