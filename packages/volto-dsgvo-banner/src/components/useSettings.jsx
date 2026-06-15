import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';

const useSettings = () => {
  // Use settings from kitconcept-website distribution control panel, if present.
  const dsgvoSiteSettings = useSelector(
    (state) => state.site?.data?.['kitconcept.website.dsgvo'],
  );

  const settings = {
    // Use settings from kitconcept-website distribution control panel, if present.
    ...{
      showBanner: dsgvoSiteSettings?.show_banner ?? false,
      modules: dsgvoSiteSettings?.modules ?? [],
    },
    ...config.settings.DSGVOBanner,
  };

  if (dsgvoSiteSettings?.tracker) {
    settings.tracker = {
      ...settings.tracker,
      type: dsgvoSiteSettings.tracker,
      ...(dsgvoSiteSettings.tracker_options ?? {}),
    };
  }

  if (dsgvoSiteSettings?.privacy_url) {
    settings.privacy_url = dsgvoSiteSettings.privacy_url;
  }

  return settings;
};

export default useSettings;
