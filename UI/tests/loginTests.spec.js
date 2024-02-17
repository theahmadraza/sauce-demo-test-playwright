const { test, expect } = require("@playwright/test");
const validCredentials = require("../support/fixtures/validCredentials.json");
const invalidCredentials = require("../support/fixtures/invalidCredentials.json");
const errorMessages = require("../support/fixtures/errorMessages.json");
const emptyCredentials = require("../support/fixtures/emptyCredentials.json");
import { LoginPage } from "../support/pages/loginPage";
import { loginLocators } from "../support/locators/loginLocators";
const baseURL = "/";
const homepageUrl = "/inventory.html";
test.describe("Login tests", () => {
  let loginPage;
  test.beforeEach("Opening login page", async ({ page }) => {
    await page.goto(baseURL);
    loginPage = new LoginPage(page, loginLocators);
  });
  test.afterEach("CleanUp", async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
  });
  test("should allow a user to log in with valid credentials", async () => {
    await loginPage.submitLoginForm(
      validCredentials.username,
      validCredentials.password
    );
    await loginPage.assertLoginOutcome(true, homepageUrl, null);
  });
  test("should display an error message for empty inputs", async () => {
    await loginPage.submitLoginForm(
      emptyCredentials.username,
      emptyCredentials.password
    );
    await loginPage.assertLoginOutcome(
      false,
      baseURL,
      errorMessages.emptyErrorMessage
    ); //assertThatErrorMessageIsDisplayed
  });
  test("should display an error message for invalid credentials", async () => {
    await loginPage.submitLoginForm(
      invalidCredentials.username,
      invalidCredentials.password
    );

    await loginPage.assertLoginOutcome(
      false,
      baseURL,
      errorMessages.invalidCredentialsErrorMessage
    ); //assert that errorMessageIsDisplayed
  });
});
