import { Banner } from './components';
import { DSGVOBanner } from './reducers';
import DSGVOBannerEdit from './components/Block/Edit';
import DSGVOBannerView from './components/Block/View';
import circleMenuSVG from '@plone/volto/icons/circle-menu.svg';
import loadable from '@loadable/component';

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
    tracker: {
      type: 'google',
      id: 'UA-123456789-1',
    },
    modules: ['tracking', 'youtube', 'facebook'],
    privacy_url: '/privacy',
    ...(config.settings.DSGVOBanner || {}),
  };
  config.settings.loadables['reactGa'] = loadable.lib(() => import('react-ga'));
  config.settings.loadables['matomoTracker'] = loadable.lib(() =>
    import('@datapunt/matomo-tracker-js'),
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
  return config;
};
