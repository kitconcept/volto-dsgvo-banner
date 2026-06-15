import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import config from '@plone/volto/registry';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import useSettings from '../useSettings';

const Matomo = ({ matomoTracker }) => {
  const [cookies] = useCookies();
  const confirmTracking = !!Number(cookies.confirm_tracking);
  const settings = useSettings();
  let tracker;

  if (__CLIENT__) {
    tracker = new matomoTracker.default({
      urlBase:
        settings.tracker.urlBase || config.settings.DSGVOBanner.tracker.urlBase,
      siteId: settings.tracker.id || config.settings.DSGVOBanner.tracker.id,
    });
  }

  useEffect(() => {
    if (confirmTracking) {
      tracker.trackPageView();
    }
  }, [tracker, confirmTracking]);

  return null;
};

export default injectLazyLibs(['matomoTracker'])(Matomo);
