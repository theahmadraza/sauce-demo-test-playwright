const { test, expect } = require("@playwright/test");
import { LoginPage } from "../support/pages/loginPage";
import { loginLocators } from "../support/locators/loginLocators";
import { ProductPage } from "../support/pages/productPage";
import { productPageLocators } from "../support/locators/productPageLocators";
import { Cart } from "../support/pages/cartPage";
import { cartLocators } from "../support/locators/cartLocators";
import { consts } from "../support/helpers/consts";
import { Checkout } from "../support/pages/checkoutPage";
import { checkoutLocators } from "../support/locators/checkoutLocators";
import { Methods } from "../support/helpers/methods";

const validCredentials = require("../support/fixtures/validCredentials.json");
const productData = require("../support/fixtures/productData.json");
const checkoutData = require("../support/fixtures/checkoutData.json");

test.describe("workflows", () => {
  let loginPage;
  let cart;
  let productPage;
  let checkout;
  let methods;
  test.beforeEach("SetUp", async ({ page }) => {
    loginPage = new LoginPage(page, loginLocators);
    productPage = new ProductPage(page, productPageLocators);
    cart = new Cart(page, cartLocators);
    checkout = new Checkout(page, checkoutLocators);
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

  test("sauceDemo full workflow", async () => {
    await test.step("should be logged in with valid credentials", async () => {
      await methods.checkingUrl(consts.productPageUrl); //assert that the user is logged in
    });

    await test.step("should add product to Cart", async () => {
      await productPage.addProductToCart(
        productPageLocators.firstProductAddCartButton
      );
      await productPage.assertCartCount(1); //assert that the count number on shoping cart icon is 1, as one product is added
    });
    await test.step("should click on the Cart and open cartPage", async () => {
      await productPage.navigateToCart();
      await methods.checkingUrl(consts.cartUrl); //assert that cart page is opened
      await methods.assertElementHasText(
        checkoutLocators.itemName,
        productData.firstProductName
      ); //assert that there is item that we added in the cart
    });
    await test.step("should proceed to Checkout", async () => {
      await cart.navigateToCheckout();
      await methods.checkingUrl(consts.checkoutUrl); //assert that the checkout page is opened
    });
    await test.step("should enter and submit CheckOut information", async () => {
      await checkout.fillAndSubmitCheckoutForm(
        checkoutData.firstName,
        checkoutData.lastName,
        checkoutData.postalCode
      );
      await methods.checkingUrl(consts.checkoutStepTwoUrl); //assert that the second step of checkout is opened
      await methods.assertElementHasText(
        checkoutLocators.itemName,
        productData.firstProductName
      ); //assert that chosen product is to be bought
    });
    await test.step("should complete the purchase", async () => {
      await methods.clickOnElement(checkoutLocators.finishBtn);
      await methods.checkingUrl(consts.checkoutCompleteUrl); //assert that we are redirected to completeOrder window
      await methods.assertElementHasText(
        checkoutLocators.completeHeader,
        checkoutData.completeOrderText
      ); //assert that that text of completed order is displayed
    });
  });
});
