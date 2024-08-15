import { useCallback, useState, useRef, useEffect } from 'react';
import { useTimeStore } from '@/store/meeting/timeStore';
import { TimeSlot } from '@/types/ResultHeatmap';

export const useTimeSelectionLogic = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { selectedTimes, toggleTime } = useTimeStore();
  const lastToggledTimeSlot = useRef<string | null>(null);

  const handleDragStart = useCallback(
    (timeSlot: TimeSlot) => {
      setIsDragging(true);
      toggleTime(timeSlot);
      lastToggledTimeSlot.current = JSON.stringify(timeSlot);
    },
    [toggleTime]
  );

  const handleDragMove = useCallback(
    (timeSlot: TimeSlot) => {
      if (isDragging) {
        const timeSlotString = JSON.stringify(timeSlot);
        if (lastToggledTimeSlot.current !== timeSlotString) {
          toggleTime(timeSlot);
          lastToggledTimeSlot.current = timeSlotString;
        }
      }
    },
    [isDragging, toggleTime]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    lastToggledTimeSlot.current = null;
  }, []);

  const isSelected = useCallback(
    (hour: string, minute: string, day: string): boolean => {
      return selectedTimes.some(
        (time) =>
          time.hour === hour && time.minute === minute && time.day === day
      );
    },
    [selectedTimes]
  );

  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault();
    document.body.addEventListener('touchmove', preventDefault, {
      passive: false,
    });
    return () => {
      document.body.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  return { handleDragStart, handleDragMove, handleDragEnd, isSelected };
};
