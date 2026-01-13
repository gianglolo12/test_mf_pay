import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import publicPath from 'vite-plugin-public-path';

import { name as packageName } from './package.json';

export default defineConfig({
  plugins: [
    react(),
    publicPath({
      publicPathProp: 'window.__INJECTED_PUBLIC_PATH_BY_VNG__',
    }),
  ],
  base: './',
  build: {
    lib: {
      entry: './src/main.tsx',
      name: `${packageName}-[name]`,
      formats: ['umd'],
      fileName: () => `index.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'React',
        },
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});
