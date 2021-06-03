module.exports = {
  presets: [[ "@vue/cli-plugin-babel/preset", {
    debug: true,
    "modules": false,
    useBuiltIns: 'usage',   // false , entry, usage,
    corejs: 3,
    targets:{
      "browsers":["> 1%", "last 2 versions", "not ie <= 8"]
    }
  }]],
  plugins: [
    ["@babel/plugin-transform-runtime", { corejs: 3 }]
  ]
}
