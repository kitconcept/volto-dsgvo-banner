import Edit from './Edit';
import View from './View';
import circleMenuSVG from '@plone/volto/icons/circle-menu.svg';
import { defineMessages } from 'react-intl';
import type { BlockConfigBase, BlockSchemaArgs } from '@plone/types';

const messages = defineMessages({
  DSGVOBannerBlock: {
    id: 'DSGVO Banner',
    defaultMessage: 'DSGVO Banner',
  },
  Default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
});

/**
 * The block stores no settings of its own: its content comes from the site
 * configuration, so the schema has no fields.
 *
 * :param intl: the react-intl object; it is the only argument the
 *   ``@blocks-schema`` endpoint passes.
 * :returns: the block schema, with one default fieldset and no properties.
 */
export const blockSchema = ({ intl }: BlockSchemaArgs) => ({
  title: intl.formatMessage(messages.DSGVOBannerBlock),
  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.Default),
      fields: [] as string[],
    },
  ],
  properties: {},
  required: [] as string[],
});

/**
 * Stores a change of the block data, merging the new value into the data.
 *
 * :param block: the id of the block being changed.
 * :param data: the current block data.
 * :param id: the name of the field being changed.
 * :param onChangeBlock: the callback that saves the block data.
 * :param value: the new value of the field.
 */
export const dataAdapter = ({
  block,
  data,
  id,
  onChangeBlock,
  value,
}: {
  block: string;
  data: Record<string, unknown>;
  id: string;
  onChangeBlock: (block: string, data: Record<string, unknown>) => void;
  value: unknown;
}) => {
  onChangeBlock(block, {
    ...data,
    [id]: value,
  });
};

// ``security`` is read by Volto but is not declared in ``BlockConfigBase``.
const dsgvoBannerBlock: BlockConfigBase & {
  security: { addPermission: string[]; view: string[] };
} = {
  id: 'dsgvoBanner',
  title: 'DSGVO Banner',
  icon: circleMenuSVG,
  group: 'common',
  view: View,
  edit: Edit,
  restricted: false,
  mostUsed: false,
  sidebarTab: 0,
  security: {
    addPermission: [],
    view: [],
  },
  blockSchema,
  dataAdapter,
};

export default dsgvoBannerBlock;
