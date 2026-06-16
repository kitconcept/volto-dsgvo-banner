import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import useSettings from '../useSettings';

const Google = ({ reactGa }) => {
  const [cookies, , removeCookie] = useCookies();
  const location = useLocation();
  const confirmTracking = !!Number(cookies.confirm_tracking);
  const settings = useSettings();

  const trackingId = settings.tracker.id;
  const gaOptions = settings.tracker.gaOptions || {};
  const gtagOptions = settings.tracker.gtagOptions || {};

  if (__CLIENT__) {
    reactGa.default.initialize([
      {
        trackingId,
        gaOptions,
        gtagOptions,
      },
    ]);
  }

  useEffect(() => {
    if (confirmTracking) {
      window[`ga-disable-${trackingId}`] = false;
    } else {
      window[`ga-disable-${trackingId}`] = true;
      removeCookie('_ga');
      removeCookie('_gat');
      removeCookie('_gid');
    }
  }, [confirmTracking, removeCookie, trackingId]);

  useEffect(() => {
    if (confirmTracking) {
      reactGa.default.send({ hitType: 'pageview', page: location.pathname });
    }
  }, [location, confirmTracking, reactGa]);

  return null;
};

export default injectLazyLibs(['reactGa'])(Google);
