

npm create vite@latest app-react-ts -- --template react-ts

//install ulang package
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install

//===========================================================================================================

//Gunakan Sertifikat SSL Custom (Untuk Produksi atau Penggunaan Tetap)
//Alternatif: Jika kamu tidak ingin menginstall OpenSSL secara manual, gunakan mkcert (lebih mudah dan tanpa error keamanan di browser):
npm install --save-dev vite-plugin-mkcert

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [react(), mkcert()], // Tambahkan mkcert ke plugins
  server: {
    https: true, // Aktifkan HTTPS
  },
});

//======================

//tekan yes di windows
PS D:\file-kodingan\app-react-ts> npm run dev

> app-react-ts@0.0.0 dev
> vite

The list of generated files:
C:\Users\dnrahmath\.vite-plugin-mkcert\dev.pem
C:\Users\dnrahmath\.vite-plugin-mkcert\cert.pem
1:07:06 PM [vite] (client) Re-optimizing dependencies because lockfile has changed

  VITE v6.2.2  ready in 22710 ms

  ➜  Local:   https://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

//===========================================================================================================


//===========================================================================================================

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
