import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import publicPath from "vite-plugin-public-path";

import { name as packageName } from './package.json';

export default defineConfig({
  plugins: [
    react(),
    publicPath({
      // Plugin này sẽ biến đổi các đường dẫn asset thành biến runtime
      publicPathProp: 'window.__INJECTED_PUBLIC_PATH_BY_VNG__',
    }),
  ],
  base: './', // Quan trọng để đường dẫn ảnh/css không bị sai khi nhúng vào main app
  build: {
    lib: {
      entry: './src/main.tsx', // Đường dẫn file entry ở bước 1
      name: `${packageName}-[name]`, // Khớp với library: `${packageName}-[name]` của Main App
      formats: ['umd'],
      fileName: () => `index.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
           'react/jsx-runtime': 'React'
        },
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});
