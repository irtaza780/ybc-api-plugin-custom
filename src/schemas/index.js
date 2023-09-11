import importAsString from "@reactioncommerce/api-utils/importAsString.js";

const product = importAsString("./product.graphql");
const shop = importAsString("./shop.graphql");

export default [product, shop];
