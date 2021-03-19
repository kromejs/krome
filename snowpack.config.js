// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: '/',
    public: { url: '/', static: true, resolve: false },
  },
  buildOptions: {
    out: 'dist',
    metaUrlPath: 'modules',
  },
};
