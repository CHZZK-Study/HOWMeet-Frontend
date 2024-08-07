import HowMeetHeader from '@/components/common/HowMeetHeader';
import MeetingHeader from '@/components/meeting/MeetingHeader';
import ResultGraph from '@/components/meeting/result/ResultGraph';
import { NormalContainer } from '@/styles/components/container';
import { ResultHeatmapProps } from '@/types/ResultHeatmap';

function ResultGraphPage() {
  const dummyData: ResultHeatmapProps[] = [
    {
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
        {
          time: '2024-08-01T10:00',
          users: ['김철수', '이영희', '박민수'],
          userCount: 3,
        },
        {
          time: '2024-08-01T10:30',
          users: ['김철수', '이영희', '박민수', '정지은'],
          userCount: 4,
        },
        {
          time: '2024-08-01T11:00',
          users: ['김철수', '이영희', '박민수', '정지은', '홍길동'],
          userCount: 5,
        },
        {
          time: '2024-08-01T14:00',
          users: ['강서연', '윤태호', '송미라'],
          userCount: 3,
        },
        {
          time: '2024-08-01T14:30',
          users: ['강서연', '윤태호', '송미라', '조현우'],
          userCount: 4,
        },
        {
          time: '2024-08-01T15:00',
          users: ['강서연', '윤태호', '송미라', '조현우', '임세라'],
          userCount: 5,
        },
        {
          time: '2024-08-02T09:00',
          users: ['김철수', '이영희', '정지은', '홍길동'],
          userCount: 4,
        },
        {
          time: '2024-08-02T09:30',
          users: ['김철수', '이영희', '정지은', '홍길동', '강서연'],
          userCount: 5,
        },
        {
          time: '2024-08-02T13:00',
          users: ['박민수', '윤태호', '송미라', '조현우'],
          userCount: 4,
        },
        {
          time: '2024-08-02T13:30',
          users: ['박민수', '윤태호', '송미라', '조현우', '임세라'],
          userCount: 5,
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
    },
    // 필요하다면 여기에 더 많은 RoomId를 추가할 수 있습니다.
  ];
  return (
    <NormalContainer>
      <HowMeetHeader />
      <MeetingHeader />
      <ResultGraph selectedTimeSlots={dummyData} />
    </NormalContainer>
  );
}

export default ResultGraphPage;
