import ICONS from '../constants/icons';

const guideData = [
  {
    id: 1,
    alt: 'watch',
    icon: ICONS.main.watch,
    text: '가능한 시간대를 드래그로\n빠르고 편리하게 표시해요',
  },
  {
    id: 2,
    alt: 'chart',
    icon: ICONS.main.chart,
    text: '막대그래프로 결과를 한눈에\n확인 할 수 있어요',
  },
  {
    id: 3,
    alt: 'share',
    icon: ICONS.main.share,
    text: '결과를 팀원들에게 공유해요',
  },
] as const;

export default guideData;
