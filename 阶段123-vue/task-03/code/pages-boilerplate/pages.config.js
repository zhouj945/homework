module.exports = {
  build: {
    src: "src",
    dist: "release",
    temp: ".tmp",
    public: "public",
    images: "src/assets/images/**",
    fonts: "src/assets/fonts/**",
  },
  data: {
    menus: [{ name: 1 }, { name: 2 }],
    pkg: require("./package.json"),
    date: new Date(),
  },
};
