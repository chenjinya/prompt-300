import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    open:false,//服务开启后直接在浏览器中打开主页面
    host: 'localhost',//主机名
    port:8080,//端口号
    https:false,//是否开启https
    hotOnly:true,//是否开启热模块更新
    proxy:{
        //配置跨域,可参见官方文档 https://webpack.js.org/configuration/dev-server/#devserverproxy
        '/api':{
            target:'http://localhost:8102',//跨域地址
            ws:true,//如果要代理WebSockets,设置为true
            changOrigin:true,//默认flase,将主机头的原点更改为目标URL
            pathRewrite:{//如果不希望传递/api，则需要重写路径：
                '^/api': ''
            }
        }
    }
  }
})
