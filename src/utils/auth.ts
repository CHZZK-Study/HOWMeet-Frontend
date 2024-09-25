import { STORAGE_KEY } from '@/constants/storage';

export const getMemberType = () => {
  const token = localStorage.getItem(STORAGE_KEY.accessToken);

  return { isMember: Boolean(token) };
};
