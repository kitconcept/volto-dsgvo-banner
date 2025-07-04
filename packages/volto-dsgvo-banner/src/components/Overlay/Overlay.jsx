import { useCookies } from 'react-cookie';
import config from '@plone/volto/registry';
import { FormattedMessage } from 'react-intl';
import { Button } from 'semantic-ui-react';
const Overlay = ({ children, module }) => {
  const [cookies, setCookie] = useCookies();

  const { showOverlay } = config.settings.DSGVOBanner;

  const confirmModule = () => {
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    const options = { path: '/', expires: expiryDate };
    setCookie(`confirm_${module}`, 1, options);
  };

  const isConfirmed = !!Number(cookies[`confirm_${module}`]);

  return (
    <>
      {showOverlay && (
        <div className="dsgvo-overlay-wrapper">
          {!isConfirmed && (
            <div className="dsgvo-overlay">
              <div className="dsgvo-overlay-content">
                <p>
                  <FormattedMessage
                    id="This content is provided by a third-party service. To view it, please allow cookies for {module} in your privacy settings."
                    defaultMessage="This content is provided by a third-party service. To view it, please allow cookies for {module} in your privacy settings."
                    values={{
                      module: <b>{module}</b>,
                    }}
                  />
                </p>
                <div>
                  <Button
                    className="dsgvo-allow-btn"
                    onClick={() => confirmModule(module)}
                  >
                    <FormattedMessage
                      id="Allow and Continue"
                      defaultMessage="Allow and Continue"
                    />
                  </Button>
                </div>
              </div>
            </div>
          )}
          <div>{children}</div>
        </div>
      )}
    </>
  );
};

export default Overlay;
