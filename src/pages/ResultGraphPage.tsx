// import HowMeetHeader from '@/components/common/HowMeetHeader';
import HowMeetHeader from '@/components/common/HowMeetHeader';
import MeetingHeader from '@/components/meeting/MeetingHeader';
import SelectNavbar from '@/components/meeting/result/navbar/SelectNavbar';
import ResultHeatmap from '@/components/meeting/result/ResultHeatmap';
import TimeRankingChart from '@/components/meeting/result/TimeRankingChart';
// import ResultGraph from '@/components/meeting/result/ResultGraph';
import { NormalContainer } from '@/styles/components/container';
import { ResultHeatmapProps } from '@/types/ResultHeatmap';
import { calculateTimeRanking } from '@/utils/meeting/graph/calculateRanking';
import { useState } from 'react';

function ResultGraphPage() {
  const [selectedOption, setSelectedOption] =
    useState<string>('최적의 회의 시간');

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

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
      '2024-08-02',
      '2024-08-03',
      '2024-08-04',
      '2024-08-05',
      '2024-08-06',
      '2024-08-07',
      '2024-08-08',
    ],
    months: ['8/2', '8/3', '8/4', '8/5', '8/6', '8/7', '8/8'],
  };

  const dummyData: ResultHeatmapProps = {
    RoomId: 12,
    totalParticipants: {
      count: 10,
      names: [
        '김철수',
        '이영희',
        '박민수',
        '정지은',
        '홍길동',
        '강서연',
        '윤태호',
        '송미라',
        '조현우',
        '임세라',
      ],
    },
    selectTime: [
      // 연속적으로 같은 사용자가 선택된 경우
      {
        time: '2024-08-07T09:00',
        users: [
          '김철수',
          '이영희',
          '박민수',
          '정지은',
          '홍길동',
          '강서연',
          '윤태호',
          '송미라',
          '조현우',
          '임세라',
        ],
        userCount: 9,
      },
      {
        time: '2024-08-07T09:30',
        users: [
          '김철수',
          '이영희',
          '박민수',
          '정지은',
          '홍길동',
          '강서연',
          '윤태호',
          '송미라',
          '조현우',
          '임세라',
        ],
        userCount: 9,
      },
      {
        time: '2024-08-07T10:00',
        users: [
          '김철수',
          '이영희',
          '박민수',
          '정지은',
          '홍길동',
          '강서연',
          '윤태호',
          '송미라',
          '조현우',
          '임세라',
        ],
        userCount: 9,
      },
      // 일부 사용자가 변경된 경우
      {
        time: '2024-08-07T10:30',
        users: ['김철수', '이영희', '정지은', '홍길동'],
        userCount: 4,
      },
      {
        time: '2024-08-07T11:00',
        users: ['김철수', '정지은', '홍길동', '강서연'],
        userCount: 4,
      },
      {
        time: '2024-08-07T11:30',
        users: ['김철수', '정지은', '홍길동', '강서연', '조현우'],
        userCount: 5,
      },
      // 사용자들이 전혀 다른 경우
      {
        time: '2024-08-07T14:00',
        users: ['박민수', '윤태호', '송미라'],
        userCount: 3,
      },
      {
        time: '2024-08-07T14:30',
        users: ['박민수', '윤태호', '송미라', '조현우'],
        userCount: 4,
      },
      {
        time: '2024-08-07T15:00',
        users: ['박민수', '윤태호', '송미라', '조현우', '임세라'],
        userCount: 5,
      },
      {
        time: '2024-08-07T15:30',
        users: ['박민수', '윤태호', '조현우'],
        userCount: 3,
      },
      // 동점인 경우
      {
        time: '2024-08-07T16:00',
        users: ['강서연', '임세라', '홍길동', '조현우'],
        userCount: 4,
      },
      {
        time: '2024-08-07T16:30',
        users: ['강서연', '임세라', '홍길동', '조현우'],
        userCount: 4,
      },
      // 다른 사용자들이 포함된 경우
      {
        time: '2024-08-08T09:00',
        users: ['조현우', '윤태호', '정지은'],
        userCount: 3,
      },
      {
        time: '2024-08-08T09:30',
        users: ['조현우', '윤태호', '정지은', '강서연'],
        userCount: 4,
      },
      {
        time: '2024-08-08T10:00',
        users: ['조현우', '윤태호', '정지은', '강서연', '임세라'],
        userCount: 5,
      },
      {
        time: '2024-08-08T10:30',
        users: ['조현우', '윤태호', '정지은', '강서연'],
        userCount: 4,
      },
      {
        time: '2024-08-08T11:00',
        users: ['조현우', '윤태호', '정지은'],
        userCount: 3,
      },
    ],
    participatedUsers: {
      names: [
        '김철수',
        '이영희',
        '박민수',
        '정지은',
        '홍길동',
        '강서연',
        '윤태호',
        '송미라',
        '조현우',
        '임세라',
      ],
      count: 10,
    },
  };

  console.log(calculateTimeRanking(dummyData.selectTime));

  const maxPeople = dummyData.participatedUsers.count;
  return (
    <NormalContainer>
      <HowMeetHeader />
      <MeetingHeader />
      <SelectNavbar
        handleSelectOption={handleSelectOption}
        selectedOption={selectedOption}
      />
      {selectedOption === '최적의 회의 시간' ? (
        <TimeRankingChart
          data={calculateTimeRanking(dummyData.selectTime)}
          maxPeople={maxPeople}
        />
      ) : (
        <ResultHeatmap data={timeTableData} roomInfo={dummyData} />
      )}
    </NormalContainer>
  );
}

export default ResultGraphPage;
