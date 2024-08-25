export const registerServiceWorker = () => {
  navigator.serviceWorker
    .register('firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker 등록 성공:', registration);
    })
    .catch((error) => {
      console.log('Service Worker 등록 실패:', error);
    });
};
