import React, { useState, useEffect } from 'react';
import { includes, isObject } from 'lodash';
import { Button, Modal, Checkbox, Form } from 'semantic-ui-react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import config from '@plone/volto/registry';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';
import Google from './Google';
import Matomo from './Matomo';
import { BodyClass } from '@plone/volto/helpers';

import { hideDSGVOBanner } from '../../actions';

const messages = defineMessages({
  technically_required: {
    id: 'Technically required',
    defaultMessage: 'Technically required',
  },
  tracking: {
    id: 'Tracking',
    defaultMessage: 'Tracking',
  },
});

const Banner = (props) => {
  let privacy_url = config.settings.DSGVOBanner.privacy_url;
  const modules = config.settings.DSGVOBanner.modules;
  const [cookies, setCookie, removeCookie] = useCookies();
  const [configureCookies, setConfigureCookies] = useState(false);
  const showConfirmModal = !Number(cookies.confirm_cookies) || props.show;
  const intl = useIntl();

  if (isObject(privacy_url)) {
    privacy_url = privacy_url[intl.locale];
  }
  const [confirmTracking, setConfirmTracking] = useState(
    !!Number(cookies.confirm_tracking),
  );
  const [confirmYoutube, setConfirmYoutube] = useState(
    !!Number(cookies.confirm_youtube),
  );
  const [confirmFacebook, setConfirmFacebook] = useState(
    !!Number(cookies.confirm_facebook),
  );
  const [confirmGoogle, setConfirmGoogle] = useState(
    !!Number(cookies.confirm_google),
  );

  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + 1);
  const options = { path: '/', expires: expiryDate };

  const confirmSelection = () => {
    let expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    if (confirmTracking) {
      setCookie('confirm_tracking', 1, options);
      window[`ga-disable-${config.settings.DSGVOBanner.trackingId}`] = false;
    } else {
      removeCookie('confirm_tracking', options);
      window[`ga-disable-${config.settings.DSGVOBanner.trackingId}`] = true;
      removeCookie('_ga', options);
      removeCookie('_gat', options);
      removeCookie('_gid', options);
    }

    if (confirmFacebook) {
      setCookie('confirm_facebook', 1, options);
    } else {
      removeCookie('confirm_facebook', options);
    }

    if (confirmYoutube) {
      setCookie('confirm_youtube', 1, options);
    } else {
      removeCookie('confirm_youtube', options);
    }

    if (confirmGoogle) {
      setCookie('confirm_google', 1, options);
    } else {
      removeCookie('confirm_google', options);
    }

    setCookie('confirm_cookies', 1, options);
    props.hideDSGVOBanner();
  };

  const confirmAll = () => {
    setCookie('confirm_tracking', 1, options);
    window[`ga-disable-${config.settings.DSGVOBanner.trackingId}`] = false;

    setCookie('confirm_facebook', 1, options);
    setCookie('confirm_youtube', 1, options);
    setCookie('confirm_google', 1, options);
    setCookie('confirm_cookies', 1, options);

    props.hideDSGVOBanner();
  };

  useEffect(() => {
    if (document && showConfirmModal) {
      document.getElementById('question-landing').focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {config.settings.DSGVOBanner.tracker.type === 'google' && <Google />}
      {config.settings.DSGVOBanner.tracker.type === 'matomo' && <Matomo />}
      <BodyClass className={showConfirmModal ? 'openCookieBanner': ''} />
      <Modal
        id="question-landing"
        open={showConfirmModal}
        dimmer="inverted"
        closeOnDimmerClick={false}
        className="dsgvo-banner"
      >
        {!configureCookies ? (
          <>
            <Modal.Content>
              <h2>
                <FormattedMessage
                  id="Privacy Notice"
                  defaultMessage="Privacy Notice"
                />
              </h2>

              <p className="cookie-text">
                <FormattedMessage
                  id="To give you the best possible user experience, we use cookies on our website. Cookies required for the operation of the site are set automatically. You can also allow other cookies. You can {agree_all_cookies} or {adjust_privacy_settings}."
                  defaultMessage="To give you the best possible user experience, we use cookies on our website. Cookies required for the operation of the site are set automatically. You can also allow other cookies. You can {agree_all_cookies} or {adjust_privacy_settings}."
                  values={{
                    agree_all_cookies: (
                      <b>
                        <FormattedMessage
                          id="agree to all cookies"
                          defaultMessage="agree to all cookies"
                        />
                      </b>
                    ),
                    adjust_privacy_settings: (
                      <b>
                        <FormattedMessage
                          id="adjust the privacy settings"
                          defaultMessage="adjust the privacy settings"
                        />
                      </b>
                    ),
                  }}
                />
              </p>
              <p>
                <FormattedMessage
                  id="You can find more information on the used cookies and how you can subsequently revoke your consent in our"
                  defaultMessage="You can find more information on the used cookies and how you can subsequently revoke your consent in our"
                />{' '}
                <b>
                  <Link to={privacy_url} onClick={confirmSelection}>
                    <FormattedMessage
                      id="Privacy Policy"
                      defaultMessage="Privacy Policy"
                    />
                  </Link>
                </b>
                .
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button className="branded olive" onClick={() => confirmAll()}>
                <FormattedMessage
                  id="Agree to all cookies"
                  defaultMessage="Agree to all cookies"
                />
              </Button>
              {modules.length > 0 && (
                <Button
                  className="branded blue inverted"
                  branded
                  onClick={() => setConfigureCookies(true)}
                >
                  <FormattedMessage
                    id="Adjust privacy settings"
                    defaultMessage="Adjust privacy settings"
                  />
                </Button>
              )}
            </Modal.Actions>
          </>
        ) : (
          <>
            <Modal.Content>
              <h2>
                <FormattedMessage
                  id="Privacy Notice"
                  defaultMessage="Privacy Notice"
                />
              </h2>
              <Form>
                <Form.Field>
                  <Checkbox
                    toggle
                    label={intl.formatMessage(messages.technically_required)}
                    checked
                    disabled
                  />
                </Form.Field>
                {includes(modules, 'tracking') && (
                  <Form.Field>
                    <Checkbox
                      toggle
                      label={intl.formatMessage(messages.tracking)}
                      onChange={() => setConfirmTracking(!confirmTracking)}
                      checked={confirmTracking}
                    />
                  </Form.Field>
                )}
                {includes(modules, 'youtube') && (
                  <Form.Field>
                    <Checkbox
                      toggle
                      label="Youtube"
                      onChange={() => setConfirmYoutube(!confirmYoutube)}
                      checked={confirmYoutube}
                    />
                  </Form.Field>
                )}
                {includes(modules, 'facebook') && (
                  <Form.Field>
                    <Checkbox
                      toggle
                      label="Facebook"
                      onChange={() => setConfirmFacebook(!confirmFacebook)}
                      checked={confirmFacebook}
                    />
                  </Form.Field>
                )}
                {includes(modules, 'google') && (
                  <Form.Field>
                    <Checkbox
                      toggle
                      label="Google"
                      onChange={() => setConfirmGoogle(!confirmGoogle)}
                      checked={confirmGoogle}
                    />
                  </Form.Field>
                )}
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button
                className="back"
                onClick={() => setConfigureCookies(false)}
              >
                {'< '}
                <FormattedMessage id="Back" defaultMessage="Back" />
              </Button>
              <Button className="branded olive" onClick={() => confirmAll()}>
                <FormattedMessage
                  id="Agree to all cookies"
                  defaultMessage="Agree to all cookies"
                />
              </Button>
              <Button
                className="branded blue"
                branded
                onClick={confirmSelection}
              >
                <FormattedMessage id="Save" defaultMessage="Save" />
              </Button>
            </Modal.Actions>
          </>
        )}
      </Modal>
    </>
  );
};

export default connect(
  (state, props) => ({
    show: state.DSGVOBanner.show,
  }),
  {
    hideDSGVOBanner,
  },
)(Banner);
