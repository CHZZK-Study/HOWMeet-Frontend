const BASE_PATH = '/assets/icons';

const ICONS = {
  common: {
    x: `${BASE_PATH}/common/x-icon.svg`,
  },
  form: {
    clear: `${BASE_PATH}/form/clear-icon.svg`,
    visibility_off: `${BASE_PATH}/form/visibility-off.svg`,
    visibility_on: `${BASE_PATH}/form/visibility-on.svg`,
  },
} as const;

export default ICONS;
