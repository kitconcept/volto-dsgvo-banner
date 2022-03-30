import { Banner } from './components';
import { DSGVOBanner } from './reducers';

import './theme/main.less';

export default (config) => {
  config.settings.appExtras.push({
    match: '',
    component: Banner,
  });
  config.addonReducers = {
    ...config.addonReducers,
    DSGVOBanner,
  };
  config.settings.DSGVOBanner = {
    trackingId: 'UA-123456789-1',
    modules: ['tracking', 'youtube', 'facebook'],
    privacy_url: '/privacy',
    ...config.settings.DSGVOBanner,
  };
  return config;
};
