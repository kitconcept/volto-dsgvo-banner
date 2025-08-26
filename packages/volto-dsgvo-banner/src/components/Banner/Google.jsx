import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import config from '@plone/volto/registry';

const Google = ({ reactGa }) => {
  const [cookies, , removeCookie] = useCookies();
  const location = useLocation();
  const confirmTracking = !!Number(cookies.confirm_tracking);

  if (__CLIENT__) {
    reactGa.default.initialize([
      {
        trackingId:
          config.settings.DSGVOBanner.trackingId ||
          config.settings.DSGVOBanner.tracker.id,
        gaOptions: config.settings.DSGVOBanner.tracker.gaOptions || {},
        gtagOptions: config.settings.DSGVOBanner.tracker.gtagOptions || {},
      },
    ]);
  }

  useEffect(() => {
    const trackingId =
      config.settings.DSGVOBanner.trackingId ||
      config.settings.DSGVOBanner.tracker.id;
    if (confirmTracking) {
      window[`ga-disable-${trackingId}`] = false;
    } else {
      window[`ga-disable-${trackingId}`] = true;
      removeCookie('_ga');
      removeCookie('_gat');
      removeCookie('_gid');
    }
  }, [confirmTracking, removeCookie]);

  useEffect(() => {
    if (confirmTracking) {
      reactGa.default.send({ hitType: 'pageview', page: location.pathname });
    }
  }, [location, confirmTracking, reactGa]);

  return null;
};

export default injectLazyLibs(['reactGa'])(Google);
