// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    port: 8080,
    host: true,
    strictPort: true,
  },
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: "DevChoice",
        short_name: "DevChoice",
        icons: [
          {
            src: "/src/images/apple-icon-144x144.png",
            type: "image/png",
            sizes: "144x144"
          }
        ]
      }
    }),
  ],
});


