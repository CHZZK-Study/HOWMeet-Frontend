const processData = (data) => {
  const timeSlots = data.selectTime.sort(
    (a, b) => new Date(a.time) - new Date(b.time)
  );
  const mergedSlots = [];
  let currentSlot = null;

  for (const slot of timeSlots) {
    if (!currentSlot || !arraysEqual(currentSlot.users, slot.users)) {
      if (currentSlot) {
        mergedSlots.push(currentSlot);
      }
      currentSlot = { ...slot, endTime: addMinutes(new Date(slot.time), 30) };
    } else {
      currentSlot.endTime = addMinutes(new Date(slot.time), 30);
      currentSlot.userCount = Math.max(currentSlot.userCount, slot.userCount);
    }
  }
  if (currentSlot) {
    mergedSlots.push(currentSlot);
  }

  return mergedSlots
    .map((slot) => ({
      ...slot,
      duration: (slot.endTime - new Date(slot.time)) / (1000 * 60),
      score:
        slot.userCount * ((slot.endTime - new Date(slot.time)) / (1000 * 60)),
    }))
    .sort((a, b) => b.score - a.score)
    .map((slot, index) => ({ ...slot, rank: index + 1 }));
};

const addMinutes = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000);
};

const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

export default processData;
