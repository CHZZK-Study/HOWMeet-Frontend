import { getToken } from 'firebase/messaging';
import { getVapidKey, setFcmToken } from '@/apis/notification.api';
import { messaging } from './fcmConfig';
import { registerServiceWorker } from './registerServiceWorker';

export const handleAllowNotification = async () => {
  registerServiceWorker();

  if ('Notification' in window) {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      const vapidKey = await getVapidKey();

      const token = await getToken(messaging, {
        vapidKey,
      });

      if (token) {
        await setFcmToken(token);
      }
    }
  }
};
