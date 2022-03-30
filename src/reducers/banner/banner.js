/**
 * Actions reducer.
 * @module reducers/actions/actions
 */

import {
  SHOW_DSGVO_BANNER,
  HIDE_DSGVO_BANNER,
} from '../../constants/ActionTypes';

const initialState = {
  show: false,
};

/**
 * DSGVO Banner reducer.
 * @function DSGVOBanner
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export function DSGVOBanner(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_DSGVO_BANNER:
      return {
        show: true,
      };
    case HIDE_DSGVO_BANNER:
      return {
        show: false,
      };
    default:
      return state;
  }
}
