- github-actions 发布一个自己 github 仓库的代码
  - 个人设置 Personal access token
    - 拿到 token 的 名字
    - token 的值
  - 要发布 项目仓库   Settings - Secrets
    - 根据 个人token 生成一个 secret 密钥   记住 名字  MY_TOKENsMY_TOKEN
    - ***需要给予改 token 一定的访问权限***
  - 本地项目 创建 .github/workflows/ci.yml 文件    ci 名字可以任意，   github会主动执行 yml 配置
  - 本地项目 ， package.json 中添加
    - “homepage”：“https://[用户名].github.io/[仓库名称]”
  - 本地项目，创建 vue.config.js
    - ```js
        module.exports = {
          outputDir:'dist',
          publicPath: process.env.NODE_ENV === 'production' ? '/github的仓库名称/' : '/'
        }
      ```
  - git add 提交
  - git push


---

- Nuxt ssr 项目  部署到 vercel 具体看 相关文档
  - 需要 注册 vercel 账号 github 就可以
  - 需要 安装包和添加配置文件 具体看 nuxt 里 英文文档