import { createIntl } from 'react-intl';
import { blockSchema, dataAdapter } from './index';

// The schema and the adapter do not render anything, so the views are
// replaced to keep the test from loading the browser-only dependencies.
vi.mock('./View', () => ({ default: () => null }));
vi.mock('./Edit', () => ({ default: () => null }));

const intl = createIntl({ locale: 'en', messages: {} });

describe('dsgvoBanner blockSchema', () => {
  it('resolves with only intl and describes a block without fields', () => {
    const schema = blockSchema({ intl });

    expect(schema.title).toBe('DSGVO Banner');
    expect(schema.fieldsets.map((fieldset) => fieldset.id)).toEqual([
      'default',
    ]);
    expect(schema.properties).toEqual({});
    expect(schema.required).toEqual([]);
  });
});

describe('dsgvoBanner dataAdapter', () => {
  it('calls onChangeBlock with the block and the data merged with the new value', () => {
    const onChangeBlock = vi.fn();

    dataAdapter({
      block: 'block-1',
      data: { '@type': 'dsgvoBanner' },
      id: 'title',
      onChangeBlock,
      value: 'Cookies',
    });

    expect(onChangeBlock).toHaveBeenCalledTimes(1);
    expect(onChangeBlock).toHaveBeenCalledWith('block-1', {
      '@type': 'dsgvoBanner',
      title: 'Cookies',
    });
  });
});
