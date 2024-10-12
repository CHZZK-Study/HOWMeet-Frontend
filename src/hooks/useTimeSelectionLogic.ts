import { useTimeStore } from '@/store/meeting/useTimeStore';
import { ResultHeatmapCellInfo, TimeSlot } from '@/types/timeTableTypes';
import { useCallback, useState, useRef, useEffect } from 'react';

export const useTimeSelectionLogic = ({
  isSelectOption,
}: {
  isSelectOption: boolean;
}) => {
  const { selectedTimes, selectedResult, toggleTime, toggleSelectedResult } =
    useTimeStore();

  const isDraggingRef = useRef<boolean>(false);
  const lastToggledTimeSlot = useRef<string | null>(null);
  const initialSelectionState = useRef<boolean | null>(null);

  const heatmapRef = useRef<HTMLDivElement>(null);
  const [tooltipInfo, setTooltipInfo] = useState<{
    content: string;
    x: number;
    y: number;
    isAbove: boolean;
  } | null>(null);

  const isSelected = useCallback(
    (hour: string, minute: string, day: string, date: string): boolean => {
      const selectedArray = isSelectOption ? selectedTimes : selectedResult;
      return selectedArray.some(
        (time) =>
          time.hour === hour &&
          time.minute === minute &&
          time.day === day &&
          time.date === date
      );
    },
    [isSelectOption, selectedResult, selectedTimes]
  );

  const handleCellInteraction = useCallback(
    (
      event: React.MouseEvent | React.TouchEvent,
      slot: ResultHeatmapCellInfo | null
    ) => {
      if (slot && event && heatmapRef.current) {
        let clientY: number;

        if ('touches' in event && event.touches[0]) {
          clientY = event.touches[0].clientY;
        } else if ('clientX' in event) {
          clientY = event.clientY;
        } else {
          return;
        }

        const heatmapRect = heatmapRef.current.getBoundingClientRect();
        const tooltipHeight = 50; // 툴팁의 예상 높이, 실제 높이에 맞게 조정 필요
        const heatmapHeight = heatmapRect.height;
        const relativeY = clientY - heatmapRect.top;

        const target = event.target as HTMLElement;
        const cellRect = target.getBoundingClientRect();
        const cellCenterX =
          cellRect.left + cellRect.width / 2 - heatmapRect.left;

        const isNearBottom = relativeY + tooltipHeight + 100 > heatmapHeight;

        setTooltipInfo({
          content: `${slot.users.join(', ')}`,
          x: cellCenterX,
          y: isNearBottom ? relativeY - tooltipHeight - 30 : relativeY + 20,
          isAbove: isNearBottom,
        });
      } else {
        setTooltipInfo(null);
      }
    },
    []
  );

  const preventDefault = useCallback((e: TouchEvent) => {
    if (isDraggingRef.current) {
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    document.body.addEventListener('touchmove', preventDefault, {
      passive: false,
    });

    return () => {
      document.body.removeEventListener('touchmove', preventDefault);
    };
  }, [preventDefault]);

  const handleDragStart = useCallback(
    (
      timeSlot: TimeSlot | ResultHeatmapCellInfo,
      event: React.MouseEvent | React.TouchEvent
    ) => {
      isDraggingRef.current = true;
      initialSelectionState.current = !isSelected(
        timeSlot.hour,
        timeSlot.minute,
        timeSlot.day,
        timeSlot.date
      );
      if (isSelectOption) {
        toggleTime(timeSlot as TimeSlot);
      } else {
        toggleSelectedResult(timeSlot as ResultHeatmapCellInfo);
      }
      lastToggledTimeSlot.current = JSON.stringify(timeSlot);
      handleCellInteraction(event, timeSlot as ResultHeatmapCellInfo);
    },
    [
      handleCellInteraction,
      isSelectOption,
      isSelected,
      toggleSelectedResult,
      toggleTime,
    ]
  );

  const handleDragMove = useCallback(
    (
      timeSlot: TimeSlot | ResultHeatmapCellInfo,
      event: React.MouseEvent | React.TouchEvent
    ) => {
      if (isDraggingRef.current) {
        const timeSlotString = JSON.stringify(timeSlot);
        if (lastToggledTimeSlot.current !== timeSlotString) {
          const currentlySelected = isSelected(
            timeSlot.hour,
            timeSlot.minute,
            timeSlot.day,
            timeSlot.date
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
        handleCellInteraction(event, timeSlot as ResultHeatmapCellInfo);
      }
    },
    [
      handleCellInteraction,
      isDraggingRef,
      isSelectOption,
      isSelected,
      toggleSelectedResult,
      toggleTime,
    ]
  );

  const handleDragEnd = useCallback(() => {
    isDraggingRef.current = false;
    lastToggledTimeSlot.current = null;
    initialSelectionState.current = null;
    setTooltipInfo(null);
  }, []);

  return {
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    isSelected,
    handleCellInteraction,
    tooltipInfo,
    heatmapRef,
    setTooltipInfo,
  };
};
