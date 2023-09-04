/// Vite config
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import vueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

/* Export default */
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    vueI18nPlugin({
      globalSFCScope: true
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});
