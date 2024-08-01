const BASE_PATH = '/assets/icons';

const ICONS = {
  common: {
    x: `${BASE_PATH}/common/x-icon.svg`,
  },
  form: {
    clear: `${BASE_PATH}/form/clear.svg`,
    visibility_off: `${BASE_PATH}/form/visibility-off.svg`,
    visibility_on: `${BASE_PATH}/form/visibility-on.svg`,
  },
  main: {
    share: `${BASE_PATH}/main/share.svg`,
    chart: `${BASE_PATH}/main/checkbox.svg`,
    watch: `${BASE_PATH}/main/watch.svg`,
    title: `${BASE_PATH}/logo/logo-title.svg`,
  },
  login: {
    kakao: `${BASE_PATH}/login/kakao.svg`,
    naver: `${BASE_PATH}/login/naver.svg`,
    google: `${BASE_PATH}/login/google.svg`,
  },
} as const;

export default ICONS;
