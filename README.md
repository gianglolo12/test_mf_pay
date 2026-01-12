# Nexus Payment - Micro Frontend Application

A React-based micro frontend application built with Vite, designed to be integrated into a main portal application.

## 🚀 Features

- **React 19.2** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite 7** - Lightning-fast build tool
- **Micro Frontend Architecture** - Can be dynamically loaded into a host application
- **UMD Build** - Universal module definition for flexible integration
- **Dynamic Public Path** - Runtime asset path injection for flexible deployment

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (Package manager)

## 🛠️ Installation

```bash
# Install dependencies
pnpm install
```

## 🏃 Development

```bash
# Run development server
pnpm dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## 🏗️ Build

```bash
# Build for production
pnpm build
```

This will create a production-ready UMD bundle in the `dist` directory.

## 📦 Build Output

The build configuration produces:
- **Format**: UMD (Universal Module Definition)
- **External Dependencies**: React and ReactDOM (expected to be provided by the host application)
- **Entry Point**: `src/main.tsx`
- **Output**: `dist/index.js`

## 🔌 Integration with Host Application

This micro frontend exposes three lifecycle methods for integration:

### `bootstrap()`
Called when the application is first loaded.

```javascript
await bootstrap();
```

### `mount(props)`
Called to mount the application with the provided container.

```javascript
await mount({ container: document.getElementById('container') });
```

### `unmount()`
Called to unmount and cleanup the application.

```javascript
await unmount();
```

### Example Integration

```javascript
import * as nexusPayment from 'nexus-payment/dist/index.js';

// Bootstrap the micro frontend
await nexusPayment.bootstrap();

// Mount to a container
await nexusPayment.mount({
  container: document.getElementById('nexus-container')
});

// Later, when you need to unmount
await nexusPayment.unmount();
```

## 🎯 Standalone Mode

The application can also run in standalone mode (not integrated into a host app). This is automatically detected when `window.__POWERED_BY_VNG_HOME__` is not defined.

## 🔧 Configuration

### Vite Configuration

- **Base Path**: `./` (relative paths for flexible deployment)
- **Public Path**: Dynamic injection via `window.__INJECTED_PUBLIC_PATH_BY_VNG__`
- **External Dependencies**: React and ReactDOM are externalized

### TypeScript

The project uses TypeScript 5.9+ with strict type checking enabled.

## 📝 Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with HMR |
| `pnpm build` | Build for production |
| `pnpm lint` | Run ESLint to check code quality |
| `pnpm preview` | Preview production build locally |

## 🏗️ Project Structure

```
portal-frontend/
├── src/
│   ├── main.tsx          # Entry point with lifecycle methods
│   ├── App.tsx           # Main application component
│   ├── App.css           # Application styles
│   ├── index.css         # Global styles
│   └── assets/           # Static assets
├── public/               # Public static files
├── dist/                 # Build output (generated)
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## 🔐 Environment Variables

The application uses:
- `window.__INJECTED_PUBLIC_PATH_BY_VNG__` - Dynamic public path for assets
- `window.__POWERED_BY_VNG_HOME__` - Flag to detect host application

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `pnpm lint` to ensure code quality
4. Build and test your changes
5. Submit a pull request

## 📄 License

Private project - All rights reserved

## 🐛 Troubleshooting

### Build Issues
- Ensure you're using the correct Node.js version
- Clear `node_modules` and reinstall: `rm -rf node_modules && pnpm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

### Integration Issues
- Verify React and ReactDOM are available globally in the host application
- Check that the public path is correctly injected
- Ensure the container element exists before mounting

## 📞 Support

For issues or questions, please contact the development team.

