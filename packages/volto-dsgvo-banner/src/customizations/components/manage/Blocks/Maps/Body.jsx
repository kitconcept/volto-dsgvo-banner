/**
 * Body map block.
 * @module components/manage/Blocks/Maps/Body
 */

import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { compose } from 'redux';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import { defineMessages } from 'react-intl';
import { IfConfirm } from '../../../../../components';

/**
 * Body map block class.
 * @class Body
 * @extends Component
 */

const messages = defineMessages({
  EmbeddedMap: {
    id: 'Embedded map',
    defaultMessage: 'Embedded map',
  },
});

const Body = ({ data, intl }) => (
  <div
    className={cx('maps-inner', {
      'full-width': data.align === 'full',
    })}
  >
    <IfConfirm module="google">
      <iframe
        title={data.title || intl.formatMessage(messages.EmbeddedMap)}
        src={data.url}
        className="google-map"
        frameBorder="0"
        allowFullScreen
      />
    </IfConfirm>
  </div>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Body.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default compose(injectIntl, withBlockExtensions)(Body);
