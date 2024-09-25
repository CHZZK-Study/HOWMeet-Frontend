import { STORAGE_KEY } from '@/constants/storage';

export const getTokenFromStorage = () => {
  const getTokensFromStorage = (storage: Storage) =>
    storage.getItem(STORAGE_KEY.accessToken);

  let accessToken = getTokensFromStorage(sessionStorage);

  if (!accessToken) {
    accessToken = getTokensFromStorage(localStorage);
  }

  return { accessToken };
};
