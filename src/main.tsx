/* eslint-disable @typescript-eslint/no-explicit-any */
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { name as packageName } from '../package.json';

let root: ReactDOM.Root | null = null;

function render(props: any) {
  const { container } = props;

  const targetContainer = container
    ? container.querySelector('#root')
    : document.querySelector('#root');

  if (targetContainer) {
    root = ReactDOM.createRoot(targetContainer);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
}

// if (!(window as any).__POWERED_BY_VNG_HOME__) {
//   render({});
// }

export async function bootstrap() {
  console.log('[Nexus] app bootstraped');
}

export async function mount(props: any) {
  console.log('[Nexus] app mounted', props);
  render(props);
}

export async function unmount() {
  console.log('[Nexus] app unmounted');
  root?.unmount();
  root = null;
}

// Export default cho UMD format
export default {
  bootstrap,
  mount,
  unmount,
};

(window as any)[`${packageName}-[name]`] = { bootstrap, mount, unmount };
