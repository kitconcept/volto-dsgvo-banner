/**
 * Root reducer.
 * @module reducers/root
 */

 import defaultReducers from '@plone/volto/reducers';
 import cookieConsent from './cookieConsent/cookieConsent';
 
 /**
  * Root reducer.
  * @function
  * @param {Object} state Current state.
  * @param {Object} action Action to be handled.
  * @returns {Object} New state.
  */
 const reducers = {
   ...defaultReducers,
   cookieConsent,
   // Add your reducers here
 };
 
 export default reducers;
 