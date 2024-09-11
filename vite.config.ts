import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({ dts: 'src/components.d.ts' }),
  ],
  resolve: {
    alias: [
      {
        find: '~',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
      {
        find: '@icons',
        replacement: fileURLToPath(
          new URL('./src/components/icons', import.meta.url),
        ),
      },
    ],
  },
})
