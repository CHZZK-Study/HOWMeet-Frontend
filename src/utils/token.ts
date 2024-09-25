import { STORAGE_KEY } from '@/constants/storage';

export const getTokenFromStorage = () => {
  const getToken = (storage: Storage) =>
    storage.getItem(STORAGE_KEY.accessToken);

  let accessToken = getToken(sessionStorage);

  if (!accessToken) {
    accessToken = getToken(localStorage);
  }

  return { accessToken };
};
