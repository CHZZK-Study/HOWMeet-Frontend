import { useCallback } from 'react';

const useCopyUrl = (
  roomId: string | undefined,
  meetingId: string | undefined,
  isMember: boolean | undefined
) => {
  const handleUrlCopy = useCallback(() => {
    if (
      roomId === undefined ||
      meetingId === undefined ||
      isMember === undefined
    ) {
      return;
    }
    const baseUrl = window.location.origin;
    const path = `/meeting/${roomId}/select/${meetingId}`;
    const isGuest = !isMember;

    const fullUrl = `${baseUrl}${path}?isGuest=${isGuest}`;

    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        console.log('URL copied to clipboard:', fullUrl);
      })
      .catch((err) => {
        console.error('Failed to copy URL:', err);
      });
  }, [roomId, meetingId, isMember]);

  return handleUrlCopy;
};
export default useCopyUrl;
