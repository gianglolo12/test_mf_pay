/* eslint-disable @typescript-eslint/no-explicit-any */
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

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

if (!(window as any).__POWERED_BY_VNG_HOME__) {
  render({});
}

async function bootstrap() {
  console.log('[Nexus] app bootstraped');
}

async function mount(props: any) {
  console.log('[Nexus] app mounted', props);
  render(props);
}

async function unmount() {
  console.log('[Nexus] app unmounted');
  root?.unmount();
  root = null;
}

export default {
  bootstrap,
  mount,
  unmount,
};

// Vẫn giữ named exports cho tương thích
export { bootstrap, mount, unmount };
