// import { useTimeStore } from '@/store/meeting/useTimeStore';
// import { TimeSlot, ResultHeatmapCellInfo } from '@/types/timeTableTypes';
// import { useCallback, useState, useRef, useEffect } from 'react';

// export const useTimeResultSelectionLogic = () => {
//   const [isDragging, setIsDragging] = useState<boolean>(false);
//   const { selectedResult, toggleTime } = useTimeStore();
//   const lastToggledTimeSlot = useRef<string | null>(null);

//   const heatmapRef = useRef<HTMLDivElement>(null);
//   const [tooltipInfo, setTooltipInfo] = useState<{
//     content: string;
//     x: number;
//     y: number;
//   } | null>(null);
//   const handleDragStart = useCallback(
//     (timeSlot: TimeSlot) => {
//       setIsDragging(true);
//       toggleTime(timeSlot);
//       lastToggledTimeSlot.current = JSON.stringify(timeSlot);
//     },
//     [toggleTime]
//   );

//   const handleDragMove = useCallback(
//     (timeSlot: TimeSlot) => {
//       if (isDragging) {
//         const timeSlotString = JSON.stringify(timeSlot);
//         if (lastToggledTimeSlot.current !== timeSlotString) {
//           toggleTime(timeSlot);
//           lastToggledTimeSlot.current = timeSlotString;
//         }
//       }
//     },
//     [isDragging, toggleTime]
//   );

//   const handleDragEnd = useCallback(() => {
//     setIsDragging(false);
//     lastToggledTimeSlot.current = null;
//   }, []);

//   const isSelected = useCallback(
//     (hour: string, minute: string, day: string): boolean => {
//       return selectedResult.some(
//         (time) =>
//           time.hour === hour && time.minute === minute && time.day === day
//       );
//     },
//     [selectedResult]
//   );

//   const handleCellHover = (
//     event: React.MouseEvent,
//     slot: ResultHeatmapCellInfo | null
//   ) => {
//     if (slot && heatmapRef.current) {
//       const rect = event.currentTarget.getBoundingClientRect();
//       const heatmapRect = heatmapRef.current.getBoundingClientRect();

//       setTooltipInfo({
//         content: `${slot.users.join(', ')} ${slot.userCount}명`,
//         x: rect.left - heatmapRect.left + rect.width / 2,
//         y: rect.bottom - heatmapRect.top,
//       });
//     } else {
//       setTooltipInfo(null);
//     }
//   };
//   useEffect(() => {
//     const preventDefault = (e: Event) => e.preventDefault();
//     document.body.addEventListener('touchmove', preventDefault, {
//       passive: false,
//     });
//     return () => {
//       document.body.removeEventListener('touchmove', preventDefault);
//     };
//   }, []);

//   return {
//     handleDragStart,
//     handleDragMove,
//     handleDragEnd,
//     isSelected,
//     handleCellHover,
//     tooltipInfo,
//     setTooltipInfo,
//     heatmapRef,
//   };
// };

import { useTimeStore } from '@/store/meeting/useTimeStore';
import { TimeSlot, ResultHeatmapCellInfo } from '@/types/timeTableTypes';
import { useCallback, useState, useRef, useEffect } from 'react';

export const useTimeResultSelectionLogic = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { selectedResult, toggleTime } = useTimeStore();
  const lastToggledTimeSlot = useRef<string | null>(null);

  const heatmapRef = useRef<HTMLDivElement>(null);
  const [tooltipInfo, setTooltipInfo] = useState<{
    content: string;
    x: number;
    y: number;
  } | null>(null);

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
      return selectedResult.some(
        (time) =>
          time.hour === hour && time.minute === minute && time.day === day
      );
    },
    [selectedResult]
  );

  const handleCellHover = (
    event: React.MouseEvent,
    slot: ResultHeatmapCellInfo | null
  ) => {
    if (slot && heatmapRef.current) {
      const rect = event.currentTarget.getBoundingClientRect();
      const heatmapRect = heatmapRef.current.getBoundingClientRect();

      setTooltipInfo({
        content: `${slot.users.join(', ')} ${slot.userCount}명`,
        x: rect.left - heatmapRect.left + rect.width / 2,
        y: rect.bottom - heatmapRect.top,
      });
    } else {
      setTooltipInfo(null);
    }
  };

  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault();
    document.body.addEventListener('touchmove', preventDefault, {
      passive: false,
    });
    return () => {
      document.body.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  return {
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    isSelected,
    handleCellHover,
    tooltipInfo,
    setTooltipInfo,
    heatmapRef,
  };
};
