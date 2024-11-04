import { defineConfig } from 'vitepress'
import viteConfig from '../vite.config.mts';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Blog",
  description: "A VitePress Site",
  base: "/Blog/",
  srcDir: 'src',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '代码', link: '/practicalProjects/admin' }
    ],

    sidebar: [
      {
        text: '基础知识',
        items: [
          { text: 'Typescript', link: '/basicKnowledge/typescript' },
        ]
      },
      {
        // text: '实战项目',  //TEST
        items: [
          // { text: 'Vite + Vue3 + ElementUI + Typescript开发后台管理系统', link: '/practicalProjects/admin' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/YangGoldDragon' }
    ]
  },
  rewrites: {
    'views/practicalProjects/admin.md': 'practicalProjects/admin.md',
    'views/basicKnowledge/typescript.md': 'basicKnowledge/typescript.md',
  },
  vite: viteConfig
})
