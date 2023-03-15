import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import config from '@plone/volto/registry';
import { useLocation } from 'react-router-dom';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

const Google = ({ reactGa }) => {
  const [cookies] = useCookies();
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
    if (confirmTracking) {
      reactGa.default.send({ hitType: 'pageview', page: location.pathname });
    }
  }, [location, confirmTracking, reactGa]);

  return null;
};

export default injectLazyLibs(['reactGa'])(Google);
