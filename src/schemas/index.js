import importAsString from "@reactioncommerce/api-utils/importAsString.js";

const product = importAsString("./product.graphql");
const account = importAsString("./account.graphql");
const shop = importAsString("./shop.graphql");
const faq = importAsString("./faq.graphql");
const notifications = importAsString("./notifications.graphql");
const orders = importAsString("./orders.graphql");
const cart = importAsString("./cart.graphql");
const review = importAsString("./review.graphql");

export default [
  product,
  account,
  shop,
  faq,
  notifications,
  orders,
  cart,
  review,
];
