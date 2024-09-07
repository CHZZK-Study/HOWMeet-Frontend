import { type VitePWAOptions } from 'vite-plugin-pwa';

export const pwaConfig: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'fonts/*.woff2'],
  devOptions: {
    enabled: true,
  },
  workbox: {
    sourcemap: true,
    globPatterns: ['**/*.{js,css,html,png,svg,woff2}'], // 캐싱할 파일 유형을 지정
    globDirectory: 'dist',
  },
  manifest: {
    name: 'HowMeet',
    short_name: 'HowMeet',
    description: '일정 조율 서비스',
    start_url: '/',
    display: 'standalone',
    prefer_related_applications: false,
    background_color: '#FFFFFF',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        src: '/icon-196x196.png',
        sizes: '196x196',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  },
};
