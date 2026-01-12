declare module 'vite-plugin-public-path' {
  import { Plugin } from 'vite';

  interface PublicPathOptions {
    publicPathProp?: string;
  }

  function publicPath(options?: PublicPathOptions): Plugin;

  export default publicPath;
}

