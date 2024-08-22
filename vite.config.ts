import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import compression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240, // 压缩阈值，小于这个值的文件将不会被压缩（单位为字节）这里就是大于 10kb 菜压缩
      algorithm: 'gzip', // 压缩算法
      ext: '.gz', // 压缩文件后缀名
    })
],
build: {
  chunkSizeWarningLimit: 1000, // 单个模块文件大小限制1000KB
  terserOptions: {
    // 清除代码中console和debugger
    compress: {
      drop_console: true,
      drop_debugger: true,
    },
  },
  rollupOptions: {
    output: {
      manualChunks: {
        // 拆分代码，这个就是分包，配置完后自动按需加载，现在还比不上webpack的splitchunk，不过也能用了。
        vue: ['vue', 'pinia'],
        nim: ['nim-web-sdk-ng'],
        AgoraRTC: ['agora-rtc-sdk-ng'],
        AgoraRTM: ['agora-rtm'],
      },
    },
  },
},
})
