// import { useTimeStore } from '@/store/meeting/useTimeStore';
// import { TimeSlot } from '@/types/timeTableTypes';
// import { useCallback, useState, useRef } from 'react';

// export const useTimeSelectionLogic = () => {
//   const [isDragging, setIsDragging] = useState<boolean>(false);
//   const { selectedTimes, toggleTime } = useTimeStore();
//   const lastToggledTimeSlot = useRef<string | null>(null);
//   const initialSelectionState = useRef<boolean | null>(null);

//   const handleDragStart = useCallback(
//     (timeSlot: TimeSlot) => {
//       setIsDragging(true);
//       initialSelectionState.current = !isSelected(
//         timeSlot.hour,
//         timeSlot.minute,
//         timeSlot.day
//       );
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
//           const currentlySelected = isSelected(
//             timeSlot.hour,
//             timeSlot.minute,
//             timeSlot.day
//           );
//           if (currentlySelected !== initialSelectionState.current) {
//             toggleTime(timeSlot);
//           }
//           lastToggledTimeSlot.current = timeSlotString;
//         }
//       }
//     },
//     [isDragging, toggleTime]
//   );

//   const handleDragEnd = useCallback(() => {
//     setIsDragging(false);
//     lastToggledTimeSlot.current = null;
//     initialSelectionState.current = null;
//   }, []);

//   const isSelected = useCallback(
//     (hour: string, minute: string, day: string): boolean => {
//       return selectedTimes.some(
//         (time) =>
//           time.hour === hour && time.minute === minute && time.day === day
//       );
//     },
//     [selectedTimes]
//   );

//   return {
//     handleDragStart,
//     handleDragMove,
//     handleDragEnd,
//     isSelected,
//   };
// };
import { useTimeStore } from '@/store/meeting/useTimeStore';
import { TimeSlot } from '@/types/timeTableTypes';
import { useCallback, useState, useRef } from 'react';

export const useTimeSelectionLogic = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { selectedTimes, toggleTime } = useTimeStore();
  const lastToggledTimeSlot = useRef<string | null>(null);
  const initialSelectionState = useRef<boolean | null>(null);

  const handleDragStart = useCallback(
    (timeSlot: TimeSlot) => {
      setIsDragging(true);
      initialSelectionState.current = !isSelected(
        timeSlot.hour,
        timeSlot.minute,
        timeSlot.day
      );
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
          const currentlySelected = isSelected(
            timeSlot.hour,
            timeSlot.minute,
            timeSlot.day
          );
          if (currentlySelected !== initialSelectionState.current) {
            toggleTime(timeSlot);
          }
          lastToggledTimeSlot.current = timeSlotString;
        }
      }
    },
    [isDragging, toggleTime]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    lastToggledTimeSlot.current = null;
    initialSelectionState.current = null;
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

  return {
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    isSelected,
  };
};
