import { Banner } from './components';
import { IfConfirm } from './components';
import { DSGVOBanner } from './reducers';
import DSGVOBannerEdit from './components/Block/Edit';
import DSGVOBannerView from './components/Block/View';
import circleMenuSVG from '@plone/volto/icons/circle-menu.svg';
import loadable from '@loadable/component';

import './theme/main.less';

const applyConfig = (config) => {
  config.settings.appExtras.push({
    match: '',
    component: Banner,
  });
  config.addonReducers = {
    ...config.addonReducers,
    DSGVOBanner,
  };
  config.settings.DSGVOBanner = {
    tracker: {
      type: 'google',
      id: 'UA-123456789-1', // G-123456789
      gaOptions: {
        anonymizeIp: true,
      },
      gtagOptions: {},
    },
    modules: ['tracking', 'youtube', 'facebook', 'google'],
    // If showBanner is true, the user is prompted to accept cookies
    // when they first visit the site. If false, they don't have a chance
    // to accept cookies until they see a block where they are needed.
    showBanner: true,
    showTechnicallyRequired: true,
    cssClasses: {
      bannerAgreeButton: 'branded olive',
      bannerAdjustButton: 'branded blue',
      bannerRejectButton: 'branded olive',
    },
    privacy_url: '/privacy',
    ...(config.settings.DSGVOBanner || {}),
  };
  config.settings.loadables['reactGa'] = loadable.lib(
    () => import('react-ga4'),
  );
  config.settings.loadables['matomoTracker'] = loadable.lib(
    () => import('@datapunt/matomo-tracker-js'),
  );
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
  config.registerComponent({
    name: 'CheckPrivacyConsent',
    component: IfConfirm,
  });
  return config;
};

export default applyConfig;
