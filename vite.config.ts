import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { VueHooksPlusResolver } from '@vue-hooks-plus/resolvers'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages({
      dirs: [
        { dir: './src/pages', baseRoute: '' },
      ],
      importMode: 'async'
    }),
    Layouts({
      layoutsDirs: './src/layouts',
      defaultLayout: 'default'
    }),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      include: [/\.[tj]sx?$/,  /\.vue$/, /\.vue\?vue/],
      imports: ['vue', 'vue-router', 'pinia'],
      dirs: [
        'src/hooks',
        'src/store',
        'src/api',
        'src/utils'
      ],
      resolvers: [VueHooksPlusResolver()]
    }),
    Components({
      dts: 'src/components.d.ts',
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
        })
      ]
    })
  ],
})
