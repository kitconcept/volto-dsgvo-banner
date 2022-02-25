import tableSVG from '@plone/volto/icons/table.svg';

import { CookieBlockView, CookieBlockEdit } from './components';
import cookieConsent from './reducers/cookieConsent/cookieConsent'

import "./theme/styles.less"

export default (config) => {
  config.blocks.blocksConfig.dsgvoBanner = {
    id: 'dsgvoBanner',
    title: 'DSGVO',
    icon: tableSVG,
    group: 'common',
    view: CookieBlockView,
    edit: CookieBlockEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };


  config.addonReducers = {
    ...config.addonReducers,
    cookieConsent,
  };
  return config;
};
