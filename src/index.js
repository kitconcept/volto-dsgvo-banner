import { Banner } from './components';
import { DSGVOBanner } from './reducers';
import DSGVOBannerEdit from './components/Block/Edit';
import DSGVOBannerView from './components/Block/View';
import circleMenuSVG from '@plone/volto/icons/circle-menu.svg';

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
  config.blocks.blocksConfig.dsgvoBanner = {
    id: 'dsgvoBanner',
    title: 'DSGVO Banner',
    icon: circleMenuSVG,
    group: 'common',
    view: DSGVOBannerView,
    edit: DSGVOBannerEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 0,
    security: {
      addPermission: [],
      view: [],
    },
  };
  return config;
};
