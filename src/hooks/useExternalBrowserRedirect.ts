import { useEffect } from 'react';

const useExternalBrowserRedirect = () => {
  useEffect(() => {
    const copyToClipboard = async (val: string) => {
      await navigator.clipboard.writeText(val);
    };

    const redirectToExternalBrowser = () => {
      const targetUrl = window.location.href;
      copyToClipboard(targetUrl);

      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = 'x-web-search://?';
      } else {
        window.location.href = `intent://${targetUrl.replace(
          /https?:\/\//i,
          ''
        )}#Intent;scheme=http;package=com.android.chrome;end`;
      }
    };

    const userAgent = navigator.userAgent.toLowerCase();
    if (/kakaotalk/i.test(userAgent)) {
      window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(
        window.location.href
      )}`;
    } else if (/line/i.test(userAgent)) {
      const targetUrl = window.location.href;
      window.location.href = targetUrl.includes('?')
        ? `${targetUrl}&openExternalBrowser=1`
        : `${targetUrl}?openExternalBrowser=1`;
    } else if (
      /inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone.*whale|android.*whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|trill|SamsungBrowser\/[^1]/i.test(
        userAgent
      )
    ) {
      redirectToExternalBrowser();
    }
  }, []);
};

export default useExternalBrowserRedirect;
