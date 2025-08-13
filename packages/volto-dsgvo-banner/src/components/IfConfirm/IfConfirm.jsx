import React from 'react';
import { Button, Message } from 'semantic-ui-react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { showDSGVOBanner } from '../../actions';
import config from '@plone/volto/registry';

const IfConfirm = ({ children, module, showDSGVOBanner }) => {
  const [cookies, setCookie] = useCookies();
  const { showBanner } = config.settings.DSGVOBanner;
  const isConfirmed = !!Number(cookies[`confirm_${module}`]);

  const confirmModuleOverlay = () => {
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    const options = { path: '/', expires: expiryDate };
    setCookie(`confirm_${module}`, 1, options);
  };

  // We bail out if module is undefined, while this is most likely
  // a bug in the caller, there is nothing we can do here,
  // but we want to avoid a traceback.
  if (!module || !!Number(cookies[`confirm_${module}`])) {
    return <>{children}</>;
  } else {
    return showBanner ? (
      <div className="block">
        <Message>
          <p>
            <FormattedMessage
              id="You can not view this content at this moment because you have selected to disable {module} cookies in the privacy settings."
              defaultMessage="You can not view this content at this moment because you have selected to disable {module} cookies in the privacy settings."
              values={{
                module: <b>{module}</b>,
              }}
            />
          </p>
          <p>
            <Button onClick={showDSGVOBanner}>
              <FormattedMessage
                id="Customize Privacy Settings"
                defaultMessage="Customize Privacy Settings"
              />
            </Button>
          </p>
        </Message>
      </div>
    ) : (
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
                  onClick={() => confirmModuleOverlay(module)}
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
    );
  }
};

export default connect((state, props) => ({}), {
  showDSGVOBanner,
})(IfConfirm);
