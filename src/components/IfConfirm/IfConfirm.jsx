import React from 'react';
import { useCookies } from 'react-cookie';
import CookieConsentButtons from '../CookieConsent/CookieConsentButtons';

const IfConfirm = ({ children, module, data, extraPlaceholder }) => {
  const [cookies] = useCookies();

  // We bail out if module is undefined, while this is most likely
  // a bug in the caller, there is nothing we can do here,
  // but we want to avoid a traceback.
  if (!module || !!Number(cookies[`confirm_${module}`])) {
    return <>{children}</>;
  } else {
    return (
      <div className="cookie-consent-overlay">
        {extraPlaceholder}
        <CookieConsentButtons module={module} />
      </div>
    );
  }
};

export default IfConfirm;
