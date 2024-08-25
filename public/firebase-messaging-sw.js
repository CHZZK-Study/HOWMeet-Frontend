// service worker가 설치 되었는지
self.addEventListener('install', () => {
  self.skipWaiting();
});

// service worker가 실행 중인지
self.addEventListener('activate', () => {
  console.log('fcm sw activate..');
});

// 알림 노출하기
self.addEventListener('push', function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;

  const notificationOptions = {
    body: resultData.body,
    icon: '/icon-196x196.png',
    vibrate: [200, 100, 200],
    tag: resultData.tag,
    ...resultData,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 클릭 시
self.addEventListener('notificationclick', function (event) {
  const url = '/';
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
