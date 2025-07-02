/**
 * DSGBO Banner actions.
 * @module actions/banner/banner
 */

import {
  SHOW_DSGVO_BANNER,
  HIDE_DSGVO_BANNER,
} from '../../constants/ActionTypes';

/**
 * Show DSDGVO Banner
 * @function showDSGVOBanner
 * @returns {Object} Show DSGVO Banner action.
 */
export function showDSGVOBanner() {
  return {
    type: SHOW_DSGVO_BANNER,
  };
}

/**
 * Hide DSDGVO Banner
 * @function hideDSGVOBanner
 * @returns {Object} Hide DSGVO Banner action.
 */
export function hideDSGVOBanner() {
  return {
    type: HIDE_DSGVO_BANNER,
  };
}
