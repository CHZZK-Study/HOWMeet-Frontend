import { getToken } from 'firebase/messaging';
import { getVapidKey, setFcmToken } from '@/apis/notification.api';
import { messaging } from './fcmConfig';
import { registerServiceWorker } from './registerServiceWorker';

export const handleAllowNotification = async () => {
  registerServiceWorker();

  // 알림 권한 요청, deviceToken 발급, 서버에 post
  if ('Notification' in window) {
    try {
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        const vapidKey = await getVapidKey();

        const token = await getToken(messaging, {
          vapidKey,
        });

        if (token) {
          await setFcmToken(token);
        }
      } else if (permission === 'denied') {
        // 알림 권한 차단된 경우
      }
    } catch (error) {
      console.log('FCM deviceToken 토큰 발급 오류');
    }
  }
};
