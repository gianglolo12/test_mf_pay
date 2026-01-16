import path from 'path';
import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import publicPath from 'vite-plugin-public-path';
import fs from 'fs';

import { name as packageName } from './package.json';

// Plugin để tạo file index.html trong thư mục dist sau khi build
function copyHtmlPlugin(): Plugin {
  return {
    name: 'copy-html',
    closeBundle() {
      const htmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>portal-frontend</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script src="./${packageName}.umd.js"></script>
  </body>
</html>`;
      
      fs.writeFileSync(
        path.resolve(__dirname, 'dist/index.html'),
        htmlContent
      );
      console.log('✅ File index.html đã được tạo trong thư mục dist');
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    publicPath({
      publicPathProp: 'window.__INJECTED_PUBLIC_PATH_BY_VNG__',
    }),
    copyHtmlPlugin(),
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
