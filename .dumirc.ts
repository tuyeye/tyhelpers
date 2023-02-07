import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    name: 'tyhelpers',
    logo: 'https://twoyecloud.oss-cn-beijing.aliyuncs.com/statics/favicon.png',
    footer: 'Copyright © 2023 SQHANFU.COM.',
  },
  apiParser: {},
  resolve: {
    // 配置入口文件路径，API 解析将从这里开始
    entryFile: './src/index.tsx',
  },
});
