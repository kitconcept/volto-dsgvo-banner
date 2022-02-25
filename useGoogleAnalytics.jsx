import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

if (__CLIENT__) {
  ReactGA.initialize('UA-112268545-1', {
    // debug: true,
    gaOptions: {
      anonymizeIp: true,
    },
  });
}

const useGoogleAnalytics = () => {
  let location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname);
  }, [location]);
};

export default useGoogleAnalytics;
