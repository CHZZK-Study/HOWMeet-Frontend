import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import { pwaConfig } from './src/lib/pwaConfig';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    // react({
    //   babel: {
    //     plugins: [
    //       // other Babel plugins
    //       [
    //         '@locator/babel-jsx/dist',
    //         {
    //           env: 'development',
    //         },
    //       ],
    //     ],
    //   },
    // }),
    tsconfigPaths(),
    svgr(),
    VitePWA(pwaConfig),
  ],
});
