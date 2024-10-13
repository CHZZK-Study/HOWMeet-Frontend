import { useEffect } from 'react';
import { toast } from 'sonner';

const useExternalBrowserRedirect = () => {
  useEffect(() => {
    const copyToClipboard = async (val: string) => {
      await navigator.clipboard.writeText(val);
      toast(
        'URL주소가 복사되었습니다.\n\nSafari가 열리면 주소창을 길게 터치한 뒤, "붙여놓기 및 이동"을 누르면 정상적으로 이용하실 수 있습니다.'
      );
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
