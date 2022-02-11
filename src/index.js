import tableSVG from '@plone/volto/icons/table.svg';

import { DSGVOBanner, DSGVOBannerEdit } from './DataTable';

export default (config) => {
  config.blocks.blocksConfig.dataTable = {
    id: 'DSGVO',
    title: 'DSGVO',
    icon: tableSVG,
    group: 'common',
    view: DSGVOBanner,
    edit: DSGVOBannerEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };
  return config;
};

export default applyConfig;
