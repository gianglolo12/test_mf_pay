import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
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
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: `${packageName}-[name]`,
      formats: ['umd'],
      fileName: (format) => `${packageName}.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});
