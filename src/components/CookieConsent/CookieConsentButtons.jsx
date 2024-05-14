import React, { useState } from 'react';
import { Button, Message } from 'semantic-ui-react';
import { useCookies } from 'react-cookie';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { UniversalLink } from '@plone/volto/components';
import config from '@plone/volto/registry';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { Link } from 'react-router-dom';

const messages = defineMessages({
  videoMessage: {
    id: "Your consent to the storage of data ('cookies') is required for the playback of this video on {website}. You can view and change your current data storage settings at any time under {privacy}.",
    defaultMessage:
      "Your consent to the storage of data ('cookies') is required for the playback of this video on {website}. You can view and change your current data storage settings at any time under {privacy}.",
  },

  videoButton: {
    id: 'Agree and show video',
    defaultMessage: 'Agree and show video',
  },

  mapMessage: {
    id: "Your consent to the storage of data ('cookies') is required to show this map from {website}. You can view and change your current data storage settings at any time under {privacy}.",
    defaultMessage:
      "Your consent to the storage of data ('cookies') is required to show this map from {website}. You can view and change your current data storage settings at any time under {privacy}.",
  },

  mapButton: {
    id: 'Agree and show map',
    defaultMessage: 'Agree and show map',
  },

  contentMessage: {
    id: "Your consent to the storage of data ('cookies') is required to show this content from {website}. You can view and change your current data storage settings at any time under {privacy}.",
    defaultMessage:
      "Your consent to the storage of data ('cookies') is required to show this content from {website}. You can view and change your current data storage settings at any time under {privacy}.",
  },

  contentButton: {
    id: 'Agree and show content',
    defaultMessage: 'Agree and show content',
  },
});

const CookieConsentButtons = ({ module }) => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies();
  const [animate, setAnimate] = useState(false);
  const intl = useIntl();
  const locale = intl.locale;

  let expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + 1);
  const options = { path: '/', expires: expiryDate };

  const services = {
    gmaps: {
      name: 'maps.google.com',
      website: 'https://maps.google.com',
    },
    youtube: {
      name: 'Youtube.com',
      website: 'https://youtube.com',
    },
    vimeo: {
      name: 'Vimeo.com',
      website: 'https://vimeo.com',
    },
    twitter: {
      name: 'Twitter.com',
      website: 'https://twitter.com',
    },
    facebook: {
      name: 'Facebook.com',
      website: 'https://facebook.com',
    },
  };
  const service = services[module ?? ''];

  const links = {
    website: (
      <UniversalLink href={service?.website}>{service?.name}</UniversalLink>
    ),
    privacy: (
      <Link
        to={{
          pathname: flattenToAppURL(
            `${
              locale === 'de'
                ? config.settings.DSGVOBanner.privacy_url.de
                : config.settings.DSGVOBanner.privacy_url.en
            }#cookie-configure`,
          ),
        }}
      >
        <FormattedMessage id="privacy" defaultMessage="privacy" />
      </Link>
    ),
  };

  const messages_map = {
    video: {
      text: intl.formatMessage(messages.videoMessage, links),
      button: intl.formatMessage(messages.videoButton),
    },

    map: {
      text: intl.formatMessage(messages.mapMessage, links),
      button: intl.formatMessage(messages.mapButton),
    },

    content: {
      text: intl.formatMessage(messages.contentMessage, links),
      button: intl.formatMessage(messages.contentButton),
    },
  };

  return (
    <Message className={`cookie-consent-buttons ${animate ? 'animate' : ''}`}>
      <p>
        {module === 'gmaps'
          ? messages_map.map.text
          : module === 'youtube' || module === 'vimeo'
          ? messages_map.video.text
          : messages_map.content.text}
      </p>
      <Button
        transparent
        onClick={() => {
          setAnimate(true);
          setTimeout(function () {
            setCookie(`confirm_${module}`, 1, options);
          }, 250);
        }}
      >
        {module === 'gmaps'
          ? messages_map.map.button
          : module === 'youtube' || module === 'vimeo'
          ? messages_map.video.button
          : messages_map.content.button}
      </Button>
    </Message>
  );
};

export default CookieConsentButtons;
