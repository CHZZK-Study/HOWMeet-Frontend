const BASE_PATH = '/assets/icons';

const ICONS = {
  common: {
    x: `${BASE_PATH}/common/x-icon.svg`,
    left: `${BASE_PATH}/common/left-arrow.svg`,
    right: `${BASE_PATH}/common/right-arrow.svg`,
  },
  form: {
    clear: `${BASE_PATH}/form/clear-icon.svg`,
    visibility_off: `${BASE_PATH}/form/visibility-off.svg`,
    visibility_on: `${BASE_PATH}/form/visibility-on.svg`,
  },
  main: {
    share: `${BASE_PATH}/main/share.svg`,
    chart: `${BASE_PATH}/main/bar-chart.svg`,
    watch: `${BASE_PATH}/main/watch.svg`,
  },
} as const;

export default ICONS;
