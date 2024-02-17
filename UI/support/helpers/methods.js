const { expect } = require("@playwright/test");
export class Methods {
  constructor(page) {
    this.page = page;
  }
  async checkingUrl(url) {
    await expect(this.page).toHaveURL(url, {
      timeout: 5000,
    });
  }
  async clickOnElement(element) {
    await this.page.click(element);
  }
  async assertElementHasText(element, text) {
    const textContent = await this.page.locator(element).textContent();

    expect(textContent).toContain(text);
  }
}
