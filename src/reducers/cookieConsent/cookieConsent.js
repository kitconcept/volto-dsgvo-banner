import { UPDATE_COOKIE_CONSENT } from '../../constants/ActionTypes';

import cookie from 'react-cookie';

const initialState = {
  googleAnalytics: !!Number(cookie.load('confirm_ga')),
  youtube: !!Number(cookie.load('confirm_youtube')),
};

export default function cookieConsent(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_COOKIE_CONSENT:
      return {
        ...state,
        ...action.cookie,
      };
    default:
      return state;
  }
}
