module.exports = {
  transpileDependencies: ["vuetify"],

  devServer: {
    proxy: "https://us1.locationiq.com"
  }
};
