import { Config } from '@stencil/core';

import { postcss } from "@stencil/postcss";
import autoprefixer from "autoprefixer";
import tailwind from 'tailwindcss'

export const config: Config = {
  globalStyle: 'src/global/scrum.css',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      baseUrl: 'https://myapp.local/',
      dir: '../public'
    },
  ],
  plugins: [
    postcss({
      // add postcss plugins
      plugins: [
        tailwind(),
        autoprefixer(),

      ]
    })
  ]
};
