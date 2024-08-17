import { useTimeStore } from '@/store/meeting/useTimeStore';
import { ResultHeatmapCellInfo, TimeSlot } from '@/types/timeTableTypes';
import { useCallback, useState, useRef, useEffect } from 'react';

export const useTimeSelectionLogic = ({
  isSelectOption,
}: {
  isSelectOption: boolean;
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { selectedTimes, selectedResult, toggleTime, toggleSelectedResult } =
    useTimeStore();
  const lastToggledTimeSlot = useRef<string | null>(null);
  const initialSelectionState = useRef<boolean | null>(null);

  const heatmapRef = useRef<HTMLDivElement>(null);
  const [tooltipInfo, setTooltipInfo] = useState<{
    content: string;
    x: number;
    y: number;
  } | null>(null);

  const isSelected = useCallback(
    (hour: string, minute: string, day: string): boolean => {
      const selectedArray = isSelectOption ? selectedTimes : selectedResult;
      return selectedArray.some(
        (time) =>
          time.hour === hour && time.minute === minute && time.day === day
      );
    },
    [isSelectOption, selectedResult, selectedTimes]
  );

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    document.body.addEventListener('touchmove', preventDefault, {
      passive: false,
    });

    return () => {
      document.body.removeEventListener('touchmove', preventDefault);
    };
  }, [isDragging]);

  const handleDragStart = useCallback(
    (timeSlot: TimeSlot | ResultHeatmapCellInfo) => {
      setIsDragging(true);
      initialSelectionState.current = !isSelected(
        timeSlot.hour,
        timeSlot.minute,
        timeSlot.day
      );
      if (isSelectOption) {
        toggleTime(timeSlot as TimeSlot);
      } else {
        toggleSelectedResult(timeSlot as ResultHeatmapCellInfo);
      }
      lastToggledTimeSlot.current = JSON.stringify(timeSlot);
    },
    [isSelectOption, isSelected, toggleSelectedResult, toggleTime]
  );

  const handleDragMove = useCallback(
    (timeSlot: TimeSlot | ResultHeatmapCellInfo) => {
      if (isDragging) {
        const timeSlotString = JSON.stringify(timeSlot);
        if (lastToggledTimeSlot.current !== timeSlotString) {
          const currentlySelected = isSelected(
            timeSlot.hour,
            timeSlot.minute,
            timeSlot.day
          );
          if (currentlySelected !== initialSelectionState.current) {
            if (isSelectOption) {
              toggleTime(timeSlot as TimeSlot);
            } else {
              toggleSelectedResult(timeSlot as ResultHeatmapCellInfo);
            }
          }
          lastToggledTimeSlot.current = timeSlotString;
        }
      }
    },
    [isDragging, isSelectOption, isSelected, toggleSelectedResult, toggleTime]
  );

  const handleDragEnd = useCallback(() => {
    console.log('Drag End');
    setIsDragging(false);
    lastToggledTimeSlot.current = null;
    initialSelectionState.current = null;
  }, []);

  const handleCellHover = useCallback(
    (event: React.MouseEvent | null, slot: ResultHeatmapCellInfo | null) => {
      if (slot && event && heatmapRef.current) {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        const heatmapRect = heatmapRef.current.getBoundingClientRect();

        setTooltipInfo({
          content: `${slot.users.join(', ')} ${slot.userCount}명`,
          x: rect.left - heatmapRect.left + rect.width / 2,
          y: rect.bottom - heatmapRect.top,
        });
      } else {
        setTooltipInfo(null);
      }
    },
    []
  );

  return {
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    isSelected,
    handleCellHover,
    tooltipInfo,
    heatmapRef,
    setTooltipInfo,
  };
};
