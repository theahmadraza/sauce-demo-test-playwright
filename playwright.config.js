const { devices } = require("@playwright/test");

module.exports = {
  use: {
    baseURL: "https://www.saucedemo.com/",
    video: process.env.CI ? "retain-on-failure" : "off",
  },
  workers: process.env.CI ? 4 : undefined,
  projects: [
    {
      name: "Chromium - Laptop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 720 },
        headless: true,
      },
    },
    {
      name: "Chromium - Mobile",
      use: {
        ...devices["Pixel 5"],
        headless: true,
      },
    },
    {
      name: "Chromium - Tablet",
      use: {
        ...devices["iPad Pro 11 landscape"],
        headless: true,
      },
    },
    {
      name: "Chromium - Desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 1024 },
        headless: true,
      },
    },

    {
      name: "Microsoft Edge - Desktop",
      use: {
        ...devices["Desktop Edge"],
        viewport: { width: 1280, height: 1024 },
        channel: "msedge",
        headless: true,
      },
    },

    {
      name: "Firefox - Laptop",
      use: {
        ...devices["Desktop Firefox"],
        viewport: { width: 1280, height: 720 },
        headless: true,
      },
    },

    {
      name: "Firefox - Desktop",
      use: {
        ...devices["Desktop Firefox"],
        viewport: { width: 1280, height: 1024 },
        headless: true,
      },
    },
  ],
  reporter: [["list"], ["html", { outputFolder: "test-results" }]],
};
