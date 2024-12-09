import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import config from '@plone/volto/registry';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

const Matomo = ({ matomoTracker }) => {
  const [cookies] = useCookies();
  const confirmTracking = !!Number(cookies.confirm_tracking);
  let tracker;

  useEffect(() => {
    if (confirmTracking && __CLIENT__ ) {
      tracker = new matomoTracker.default({
        urlBase: config.settings.DSGVOBanner.tracker.urlBase,
        siteId: config.settings.DSGVOBanner.tracker.id,
        configurations: { // optional, default value: {}
          disableCookies: false,
          setSecureCookie: true,
        },
      });
      tracker.trackPageView();
    }
  }, [tracker, confirmTracking]);

  return null;
};

export default injectLazyLibs(['matomoTracker'])(Matomo);
