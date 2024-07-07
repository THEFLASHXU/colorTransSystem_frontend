import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/colorTrans', // 目标接口的域名
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, '') // 重写请求路径，去除/api前缀
      },
      '/images': {
        target: 'http://localhost:3000', // 目标接口的域名
        changeOrigin: true,              // 发送请求头中 host 会设置成 target
      }
    }
  }
})

