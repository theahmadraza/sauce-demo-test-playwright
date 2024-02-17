const { expect } = require("@playwright/test");

export class Cart {
  constructor(page, locators) {
    this.page = page;
    this.locators = locators;
  }

  async navigateToCheckout() {
    await this.page.click(this.locators.checkoutBtn);
  }
}
