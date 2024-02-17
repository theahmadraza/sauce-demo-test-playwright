const { expect } = require("@playwright/test");

export class LoginPage {
  constructor(page, locators) {
    this.page = page;
    this.locators = locators;
  }
  async submitLoginForm(username, password) {
    await this.page.fill(this.locators.userName, username);
    await this.page.fill(this.locators.password, password);
    await this.page.click(this.locators.loginButton);
  }

  async assertLoginOutcome(isValid, expectedUrl, errorMessage) {
    if (isValid) {
      await expect(this.page).toHaveURL(expectedUrl, { timeout: 5000 });
    } else {
      await expect(this.page).toHaveURL("/", { timeout: 5000 });
      const errorAlert = this.page.locator(this.locators.errorMessageFrame);
      await expect(errorAlert).toBeVisible();
      await expect(errorAlert).toHaveText(errorMessage);
    }
  }
}

