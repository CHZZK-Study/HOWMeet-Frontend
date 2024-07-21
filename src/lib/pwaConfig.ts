import { type VitePWAOptions } from 'vite-plugin-pwa';

export const pwaConfig: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
  devOptions: {
    enabled: true,
  },
  manifest: {
    name: 'HowMeet',
    short_name: 'HowMeet',
    description: '',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'assets/icons/favicon.ico',
        sizes: '64x64',
        type: 'image/x-icon',
      },
      {
        src: 'assets/icons/icon-196x196.png',
        sizes: '196x196',
        type: 'image/png',
      },
      {
        src: 'assets/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'assets/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  },
};
