import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // 后端服务器地址
        changeOrigin: true,               // 是否修改请求头中的 Origin 字段
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
