import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import config from '@plone/volto/registry';
import { useLocation } from 'react-router-dom';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

const Google = ({ reactGa }) => {
  const [cookies] = useCookies();
  const location = useLocation();
  const confirmTracking = !!Number(cookies.confirm_tracking);

  if (__CLIENT__) {
    reactGa.initialize(config.settings.DSGVOBanner.tracker.id, {
      gaOptions: {
        anonymizeIp: true,
      },
    });
  }

  useEffect(() => {
    if (confirmTracking) {
      reactGa.pageview(location.pathname);
    }
  }, [location, confirmTracking, reactGa]);

  return null;
};

export default injectLazyLibs(['reactGa'])(Google);
