import { UPDATE_COOKIE_CONSENT } from '../../constants/ActionTypes';

export default function updateCookieConsent(cookie) {
  return {
    type: UPDATE_COOKIE_CONSENT,
    cookie,
  };
}
