import React, { useState, useEffect } from 'react';
import { includes } from 'lodash';
import { Checkbox, Form, Button } from 'semantic-ui-react';
import { useCookies } from 'react-cookie';
import config from '@plone/volto/registry';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';

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

const View = (props) => {
  const modules = config.settings.DSGVOBanner.modules;
  const showTechnicallyRequired =
    config.settings.DSGVOBanner.showTechnicallyRequired;
  const bannerAgreeButton =
    config.settings.DSGVOBanner.cssClasses.bannerAgreeButton;
  const [cookies, setCookie, removeCookie] = useCookies();
  const intl = useIntl();

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
  const [confirmVimeo, setConfirmVimeo] = useState(
    !!Number(cookies.confirm_vimeo),
  );
  const [confirmTwitter, setConfirmTwitter] = useState(
    !!Number(cookies.confirm_twitter),
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

    if (confirmVimeo) {
      setCookie('confirm_vimeo', 1, options);
    } else {
      removeCookie('confirm_vimeo', 1, options);
    }

    if (confirmTwitter) {
      setCookie('confirm_twitter', 1, options);
    } else {
      removeCookie('confirm_twitter', 1, options);
    }

    setCookie('confirm_cookies', 1, options);
  };

  //Save the selection on every switch in the settings
  useEffect(() => {
    confirmSelection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    confirmYoutube,
    confirmVimeo,
    confirmTwitter,
    confirmFacebook,
    confirmGoogle,
    confirmTracking,
  ]);

  return (
    <>
      <Form>
        {showTechnicallyRequired && (
          <Form.Field>
            <Checkbox
              toggle
              label={intl.formatMessage(messages.technically_required)}
              checked
              disabled
            />
          </Form.Field>
        )}
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
        {includes(modules, 'vimeo') && (
          <Form.Field>
            <Checkbox
              toggle
              label="Vimeo"
              onChange={() => setConfirmVimeo(!confirmVimeo)}
              checked={confirmVimeo}
            />
          </Form.Field>
        )}
        {includes(modules, 'twitter') && (
          <Form.Field>
            <Checkbox
              toggle
              label="Twitter"
              onChange={() => setConfirmTwitter(!confirmTwitter)}
              checked={confirmTwitter}
            />
          </Form.Field>
        )}
        <Button
          className={bannerAgreeButton}
          onClick={() => confirmSelection()}
        >
          <FormattedMessage id="Save" defaultMessage="Save" />
        </Button>
      </Form>
    </>
  );
};

export default View;
