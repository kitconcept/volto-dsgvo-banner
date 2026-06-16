import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';

const useSettings = () => {
  // Use settings from kitconcept-website distribution control panel, if present.
  const dsgvoSiteSettings = useSelector(
    (state) => state.site?.data?.['kitconcept.website.dsgvo'],
  );

  const settings = {
    showBanner: dsgvoSiteSettings?.show_banner ?? false,
    modules: dsgvoSiteSettings?.modules ?? [],
    tracker: {
      type: dsgvoSiteSettings?.tracker ?? '',
      ...(dsgvoSiteSettings?.tracker_options ?? {}),
    },
    privacy_url: dsgvoSiteSettings?.privacy_url ?? '',
    ...config.settings.DSGVOBanner,
  };

  return settings;
};

export default useSettings;
