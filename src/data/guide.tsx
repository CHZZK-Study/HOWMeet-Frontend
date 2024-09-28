import { CheckBoxIcon, MainShareIcon, WatchIcon } from 'public/assets/icons';

const guideData = [
  {
    id: 1,
    alt: 'watch',
    icon: <WatchIcon width={48} height={48} />,
    text: '가능한 시간대를 드래그로\n빠르고 편리하게 표시해요',
  },
  {
    id: 2,
    alt: 'chart',
    icon: <CheckBoxIcon width={48} height={48} />,
    text: '막대그래프로 결과를 한눈에\n확인 할 수 있어요',
  },
  {
    id: 3,
    alt: 'share',
    icon: <MainShareIcon width={48} height={48} />,
    text: '결과를 팀원들에게 공유해요',
  },
] as const;

export default guideData;

// roomId: 1,
// scheduleID: ??,
// 회원이면 roomId, msId(회원일정아이디)
// 비회원이면 gsId(비회원일정아이디)
