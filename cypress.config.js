const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  viewportHeight: 3840,
  viewportWidth: 2160,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
