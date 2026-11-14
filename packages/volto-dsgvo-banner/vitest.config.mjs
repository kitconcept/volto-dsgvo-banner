import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Icons are imported as components by the block configuration; the unit
// tests only need their path, so they are replaced with an empty module.
const svgStub = {
  name: 'svg-stub',
  enforce: 'pre',
  transform(code, id) {
    if (id.endsWith('.svg')) {
      return { code: 'export default "";', map: null };
    }
    return null;
  },
};

export default defineConfig({
  plugins: [svgStub],
  esbuild: {
    jsx: 'automatic',
  },
  resolve: {
    alias: {
      '@plone/volto': path.resolve(__dirname, '../../core/packages/volto/src'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
  },
});
