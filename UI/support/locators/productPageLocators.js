export const productPageLocators = {
  hamburgerMenuButton: "#react-burger-menu-btn",
  allItemsSidebarLink: "#inventory_sidebar_link",
  aboutSidebarLink: "#about_sidebar_link",
  logoutSidebarLink: "#logout_sidebar_link",
  resetSidebarLink: "#reset_sidebar_link",
  sortButton: '[data-test="product_sort_container"]',
  sortByNameAtoZ: " .product_sort_container > option:nth-child(1)",
  sortByNameZtoA: ".product_sort_container > option:nth-child(2)",
  sortByPriceAsc: ".product_sort_container > option:nth-child(3)",
  sortByPriceDesc: ".product_sort_container > option:nth-child(4)",
  shopingCartLink: ".shopping_cart_link",
  cartCount: ".shopping_cart_link .shopping_cart_badge",
  firstProductAddCartButton: '[data-test="add-to-cart-sauce-labs-backpack"]',
  inventoryItemName: ".inventory_item_name",
  inventoryItemPrice: ".inventory_item_price",
  firstProductRemoveCartButtton: "#remove-sauce-labs-backpack",
};
