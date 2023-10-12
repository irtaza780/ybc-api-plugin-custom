import decodeOpaqueIdForNamespace from "@reactioncommerce/api-utils/decodeOpaqueIdForNamespace.js";
import encodeOpaqueId from "@reactioncommerce/api-utils/encodeOpaqueId.js";

const namespaces = {
  Account: "reaction/account",
  Address: "reaction/address",
  Cart: "reaction/cart",
  CartItem: "reaction/cartItem",
  FulfillmentGroup: "reaction/fulfillmentGroup",
  Product: "reaction/product",
  Shop: "reaction/shop",
  Tag: "reaction/tag",
};

export const encodeAccountOpaqueId = encodeOpaqueId(namespaces.Account);
export const encodeAddressOpaqueId = encodeOpaqueId(namespaces.Address);
export const encodeCartItemOpaqueId = encodeOpaqueId(namespaces.CartItem);
export const encodeCartOpaqueId = encodeOpaqueId(namespaces.Cart);
export const encodeFulfillmentGroupOpaqueId = encodeOpaqueId(
  namespaces.FulfillmentGroup
);
export const encodeShopOpaqueId = encodeOpaqueId(namespaces.Shop);
export const encodeProductOpaqueId = encodeOpaqueId(namespaces.Product);

export const decodeAccountOpaqueId = decodeOpaqueIdForNamespace(
  namespaces.Account
);
export const decodeAddressOpaqueId = decodeOpaqueIdForNamespace(
  namespaces.Address
);
export const decodeCartItemOpaqueId = decodeOpaqueIdForNamespace(
  namespaces.CartItem
);
export const decodeCartOpaqueId = decodeOpaqueIdForNamespace(namespaces.Cart);
export const decodeFulfillmentGroupOpaqueId = decodeOpaqueIdForNamespace(
  namespaces.FulfillmentGroup
);
export const decodeProductOpaqueId = decodeOpaqueIdForNamespace(
  namespaces.Product
);

export const decodeShopOpaqueId = decodeOpaqueIdForNamespace(namespaces.Shop);

export const decodeTagOpaqueId = decodeOpaqueIdForNamespace(namespaces.Tag);
