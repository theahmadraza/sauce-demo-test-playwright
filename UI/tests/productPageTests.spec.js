const { test, expect } = require("@playwright/test");
import { ProductPage } from "../support/pages/productPage";
import { productPageLocators } from "../support/locators/productPageLocators";
import { LoginPage } from "../support/pages/loginPage";
import { loginLocators } from "../support/locators/loginLocators";
import { consts } from "../support/helpers/consts";
import { Methods } from "../support/helpers/methods";

const validCredentials = require("../support/fixtures/validCredentials.json");
const filter = require("../support/fixtures/filter.json");

test.describe("Product page tests", () => {
  let productPage;
  let loginPage;
  let methods;

  test.beforeEach("SetUp", async ({ page }) => {
    productPage = new ProductPage(page, productPageLocators);
    loginPage = new LoginPage(page, loginLocators);
    methods = new Methods(page);
    await page.goto(consts.loginUrl);
    await loginPage.submitLoginForm(
      validCredentials.username,
      validCredentials.password
    );
  });
  test.afterEach("CleanUp", async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
  });
  test("should navigate to the correct productPage URL", async () => {
    await methods.checkingUrl(consts.productPageUrl);
  });
  test("should open the hamburger menu successfully", async () => {
    await productPage.clickAndAssertHamburgerMenu();
  });
  test("should correctly sort items by name in ascending order", async () => {
    await productPage.applyFilter(filter.click, filter.nameAsc);
    await productPage.assertSortingByNameAsc();
  });
  test("should correctly sort items by name in descending order", async () => {
    await productPage.applyFilter(filter.selectOption, filter.nameDesc);
    await productPage.assertSortingByNameDesc();
  });
  test("should correctly sort items by price in ascending order", async () => {
    await productPage.applyFilter(filter.selectOption, filter.priceAsc);
    await productPage.assertSortingByPriceAsc();
  });
  test("should correctly sort items by price in descending order", async () => {
    await productPage.applyFilter(filter.selectOption, filter.priceDesc);
    await productPage.assertSortingByPriceDesc();
  });
  test("should add product to cart and have count number 1 on shopping cart icon link", async () => {
    await productPage.addProductToCart(
      productPageLocators.firstProductAddCartButton
    );
    await productPage.assertCartCount(1);
  });
  test("should remove product from the cart and cart icon to be without count number", async () => {
    await productPage.addProductToCart(
      productPageLocators.firstProductAddCartButton
    );
    await productPage.assertCartCount(1);
    await productPage.removeProductFromCart(
      productPageLocators.firstProductRemoveCartButtton
    );
    await productPage.assertEmptyCartCount();
  });
});
