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

export const deleteTokenFromStorage = () => {
  localStorage.removeItem(STORAGE_KEY.accessToken);
  sessionStorage.removeItem(STORAGE_KEY.accessToken);
};
