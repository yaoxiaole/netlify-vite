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
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
    // 关闭文件计算
    reportCompressedSize: false,
    // 关闭生成map文件 可以达到缩小打包体积
    sourcemap: false, // 这个生产环境一定要关闭，不然打包的产物会很大
    // 压缩
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // 入口文件名
        entryFileNames: `assets/js/[name]-[hash].js`,
        // 块文件名
        chunkFileNames: `assets/js/[name]-[hash].js`,
        // 资源文件名 css 图片等等
        assetFileNames: `assets/[ext]/[name]-[hash].[ext]`,
        // 大文件拆分
        manualChunks(id) {
          if (id.includes("node_modules")) {
             //把vue vue-router  @vueuse 等核心模块打包成一个文件
            if (id.includes('vue')) {
              return 'vue';
            }else{
              //最小化拆分包
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
            
          }
        },
      },
    },
  },
})
