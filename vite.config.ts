import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// 导入你的 getEnv.ts
import { wrapperEnv } from './src/utils/getEnv'

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 加载 .env
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)

  // 读取配置
  const baseUrl = viteEnv.VITE_API_BASE_URL
  const target = viteEnv.VITE_PROXY_TARGET
  const port = viteEnv.VITE_PORT
  const open = viteEnv.VITE_OPEN

  return {
    plugins: [vue(), vueJsx(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      host: '0.0.0.0',
      port: port,
      open: open,
      cors: true,
      proxy: {
        [baseUrl]: {
          target: target,
          changeOrigin: true,
        },
      },
    },
  }
})