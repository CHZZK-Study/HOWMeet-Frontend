import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import AttendStatusHeader from '@/components/meeting/result/AttendStatusHeader';
import ResultHeatmap from '@/components/meeting/result/ResultHeatmap';
import {
  ButtonContainer,
  NormalContainer,
} from '@/styles/components/container';
import { ResultHeatmapProps } from '@/types/ResultHeatmap';
import { useState } from 'react';

function ResultPage() {
  const timeTableData = {
    hours: [
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
    ],
    days: ['월', '화', '수', '목', '금', '토', '일'],
    dates: [
      '2024-07-01',
      '2024-07-02',
      '2024-07-03',
      '2024-07-04',
      '2024-07-05',
      '2024-07-06',
      '2024-07-07',
    ],
    months: ['7/1', '7/2', '7/3', '7/4', '7/5', '7/6', '7/7'],
  };

  const selectedTimeSlots: ResultHeatmapProps = {
    RoomId: 11,
    totalParticipants: {
      count: 9,
      names: [
        '오영',
        '채림',
        '구예진',
        '고세종',
        '류지민',
        '김유희',
        '경효선',
        '김수현',
        '김민우',
      ],
    },
    selectTime: [
      {
        time: '2024-07-01T19:30',
        users: ['오영', '채림'],
        userCount: 2,
      },
      {
        time: '2024-07-03T10:00',
        users: ['오영'],
        userCount: 1,
      },
      {
        time: '2024-07-02T12:30',
        users: ['채림'],
        userCount: 1,
      },
      {
        time: '2024-07-01T20:30',
        users: ['구예진', '고세종', '류지민', '김유희'],
        userCount: 4,
      },
      {
        time: '2024-07-01T20:00',
        users: ['구예진', '고세종', '류지민', '김유희'],
        userCount: 4,
      },
      {
        time: '2024-07-03T10:30',
        users: ['경효선', '김수현', '김민우'],
        userCount: 3,
      },
      {
        time: '2024-07-01T21:00',
        users: [
          '김수현',
          '김민우',
          '김유희',
          '류지민',
          '고세종',
          '구예진',
          '채림',
          '오영',
          '경효선',
          '김민우',
          '김수현',
        ],
        userCount: 9,
      },
    ],
    participatedUsers: {
      names: ['오영', '구예진', '고세종', '류지민', '김유희', '김수현'],
      count: 8,
    },
  };

  const [isDragged, setisDragged] = useState<boolean>(true);
  return (
    <NormalContainer>
      <Header title="일정 조율" />
      <AttendStatusHeader
        TotalParticipants={9}
        currentParticipants={2}
        participatedUsers={selectedTimeSlots.participatedUsers.names}
        unParticipatedUsers={selectedTimeSlots.totalParticipants.names.filter(
          (name) => !selectedTimeSlots.participatedUsers.names.includes(name)
        )}
      />
      <ResultHeatmap data={timeTableData} roomInfo={selectedTimeSlots} />

      <ButtonContainer>
        <Button $style="solid" disabled={isDragged}>
          {isDragged ? '드래그로 시간 확정하기' : '일정 확정하기'}
        </Button>
      </ButtonContainer>
    </NormalContainer>
  );
}

export default ResultPage;
