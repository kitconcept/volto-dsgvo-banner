import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';

const useSettings = () => {
  // Use settings from kitconcept-website distribution control panel, if present.
  const dsgvoSiteSettings = useSelector(
    (state) => state.site?.data?.['kitconcept.website.dsgvo'],
  );
  return {
    // Use settings from kitconcept-website distribution control panel, if present.
    ...{
      showBanner: dsgvoSiteSettings?.show_banner ?? false,
      modules: dsgvoSiteSettings?.modules ?? [],
    },
    ...config.settings.DSGVOBanner,
  };
};

export default useSettings;
