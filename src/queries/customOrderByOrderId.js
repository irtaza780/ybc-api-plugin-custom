import _ from "lodash";
import ReactionError from "@reactioncommerce/reaction-error";
import checkMinMaxExists from "../util/checkMinMaxExists.js";
import {
  decodeShopOpaqueId,
  encodeOrderOpaqueId,
  encodeAccountOpaqueId,
  encodeShopOpaqueId,
  decodeOrderOpaqueId,
} from "../xforms/id.js";

export default async function customOrderByOrderId(context, input) {
  const { userId, authToken } = context;
  const { collections } = context;

  const { orderId, shopId } = input;

  const { Accounts, CustomOrders, Shops } = collections;

  if (!authToken || !userId)
    throw new ReactionError("access-denied", "Access Denied");

  const account = await Accounts.findOne({ _id: userId });

  const shopIdFromUser = _.get(account, "adminUIShopIds.0");
  const decodedShopId = decodeShopOpaqueId(shopId);
  const decodedOrderId = decodeOrderOpaqueId(orderId);
  if (shopIdFromUser !== decodedShopId) {
    throw new ReactionError("access-denied", "You don't own this bakery/shop");
  }

  const shop = await Shops.findOne({ _id: decodedShopId });

  if (!shop) {
    throw new ReactionError("access-denied", "Shop not found");
  }

  const customOrder = await CustomOrders.findOne({
    _id: decodedOrderId,
    shopId: decodedShopId,
  });

  if (!customOrder) return;

  customOrder["_id"] = encodeOrderOpaqueId(customOrder._id);
  customOrder["orderBy"] = encodeAccountOpaqueId(customOrder.orderBy);
  customOrder["shopId"] = encodeShopOpaqueId(customOrder.shopId);

  return customOrder;
}
