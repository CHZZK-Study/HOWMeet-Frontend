import useMakeRoomStore from '@/store/makeroom/useMakeRoomStore';
import { useEndDateStore, useStartDateStore } from '@/store/useDateStore';
import useMeetingStore from '@/store/useMeetingStore';
import { useEndTimeStore, useStartTimeStore } from '@/store/useTimeStore';

const useResetStore = () => {
  const resetRoomTitle = useMakeRoomStore((state) => state.resetRoomName);
  const resetMeetingTitle = useMeetingStore((state) => state.resetTitle);
  const resetStartDate = useStartDateStore((state) => state.resetDate);
  const resetEndDate = useEndDateStore((state) => state.resetDate);
  const resetStartTime = useStartTimeStore((state) => state.resetTime);
  const resetEndTime = useEndTimeStore((state) => state.resetTime);

  const resetStore = () => {
    resetRoomTitle();
    resetMeetingTitle();
    resetStartDate();
    resetEndDate();
    resetStartTime();
    resetEndTime();
  };

  return { resetStore };
};

export default useResetStore;
