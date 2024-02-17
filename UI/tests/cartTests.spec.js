const { test } = require("@playwright/test");
import { ProductPage } from "../support/pages/productPage";
import { productPageLocators } from "../support/locators/productPageLocators";
import { LoginPage } from "../support/pages/loginPage";
import { loginLocators } from "../support/locators/loginLocators";
import { consts } from "../support/helpers/consts";
import { Cart } from "../support/pages/cartPage";
import { cartLocators } from "../support/locators/cartLocators";
import { Methods } from "../support/helpers/methods";
const validCredentials = require("../support/fixtures/validCredentials.json");
const productData = require("../support/fixtures/productData.json");

test.describe("Cart tests", () => {
  let productPage;
  let loginPage;
  let cartPage;
  let methods;
  test.beforeEach("SetUp", async ({ page }) => {
    productPage = new ProductPage(page, productPageLocators);
    loginPage = new LoginPage(page, loginLocators);
    cartPage = new Cart(page, cartLocators);
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
  test("should navigate to the correct cart URL", async () => {
    await productPage.navigateToCart();
    await methods.checkingUrl(consts.cartUrl); //assert that cart is opened
  });
  test("added product should be visible in the cart", async () => {
    await productPage.addProductToCart(productPageLocators.firstProductAddCartButton);
    await productPage.navigateToCart();
    await methods.assertElementHasText(
      cartLocators.inventoryItemName,
      productData.firstProductName
    ); //assert that added product is in the cart
  });
});
