const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.argument("init", { type: Boolean, desc: "舒适化", default: true })
    this.option("ts");
    this.fileExt = this.options.ts ? ".ts" : "js"
  }

  methods() {
    // this.log(this.templatePath())
    // this.log(this.options.init)
    // this.log(this.options.ts)
    // this.log(this.destinationPath())
    // this.log(this.destinationRoot())
  }

  async prompting() {
    this.anwsers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Please input you project name',
        default: this.appname
      }
    ])
    this.pwdPath = '/' + this.anwsers.name + '/'
    this.log(this.contextRoot)
    // ———————利用 .yo-rc.json 保存 读取 配置—————————
    await this.config.set({name: this.anwsers.name})
    this.log(this.config.get("name"))
  }

  writing() {
    // 可利用 node api 获取模版文件夹下的所有模版文件 再遍历
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      { name: this.anwsers.name }
    )

    const pkgJson = {
      devDependencies: {
        eslint: '^3.15.0'
      },
      dependencies: {
        react: '^16.2.0'
      }
    };

    // if (this.options.ts) {
    //   this.npmInstall(['typescript'], { 'save-dev': true });
    // }
    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
  }

  // install() {
  //   this.npmInstall();
  // }
  end() {
    this.log("finish")
  }
}