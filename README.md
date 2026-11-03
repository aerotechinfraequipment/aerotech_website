# AeroTech Infra Equipment

Marketing site for AeroTech Infra Equipment: construction equipment rental and industrial product supply in Sriperumbudur, Tamil Nadu. Built with React, TypeScript, and Vite.

## Routes

- `/` — Home
- `/equipment` — Rental fleet
- `/equipment/:id` — Equipment detail
- `/products` — Industrial products catalogue
- `/products/:slug` — Product detail
- `/steel-products` — Steel, roofing, and mesh
- `/about` — About the company
- `/contact` — Contact and quote forms

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build**: Vite 8
- **Routing**: React Router DOM 7
- **Styling**: SCSS (no Bootstrap)
- **Compiler**: React Compiler
- **Linting**: ESLint with TypeScript support

## Project Structure

```
src/
├── components/             # Layout, home, forms, and UI
├── data/                   # Equipment and product catalogue
├── layout/                 # Main layout wrapper
├── pages/                  # Route pages
├── styles/                 # Shared and page SCSS
├── App.tsx                 # Routes
└── main.tsx                # React entry point
public/
├── data/products/          # Product detail JSON
├── images/                 # Product and shared images
└── schema/                 # LocalBusiness JSON-LD
```

## Getting Started

### Development

```bash
npm run dev
```

Starts the development server with hot module reloading (HMR).

### Build

```bash
npm run build
```

Compiles TypeScript and builds the production bundle.

### Preview

```bash
npm run preview
```

Preview the production build locally.

### Linting

```bash
npm run lint
```

Run ESLint to check code quality.

## Available Plugins

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) - Uses Oxc for fast React compilation
- [@rolldown/plugin-babel](https://github.com/rolldown/rolldown) - Babel integration with React Compiler preset

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information. Note: This impacts Vite dev & build performance.

## Expanding ESLint Configuration

For production applications, update [eslint.config.js](eslint.config.js) to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // ...other configs...
      tseslint.configs.recommendedTypeChecked,
      // or for stricter rules:
      tseslint.configs.strictTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

You can also add React-specific linting with [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom).