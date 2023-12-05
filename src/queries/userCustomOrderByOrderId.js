import _ from "lodash";
import ReactionError from "@reactioncommerce/reaction-error";

import {
  encodeOrderOpaqueId,
  encodeAccountOpaqueId,
  encodeShopOpaqueId,
} from "../xforms/id.js";

export default async function userCustomOrderByOrderId(context, input) {
  const { userId, authToken, collections } = context;

  if (!authToken || !userId)
    throw new ReactionError("access-denied", "Access Denied");

  const { orderId } = input;

  const { CustomOrders } = collections;

  const customOrder = await CustomOrders.findOne({
    _id: orderId,
  });

  console.log("custom Order is ", customOrder);

  if (!customOrder) return;

  if (customOrder.orderBy !== userId) {
    throw new ReactionError(
      "access-denied",
      "This order does not belong to the current user"
    );
  }

  customOrder["_id"] = encodeOrderOpaqueId(customOrder._id);
  customOrder["orderBy"] = encodeAccountOpaqueId(customOrder.orderBy);
  customOrder["shopId"] = encodeShopOpaqueId(customOrder.shopId);

  return customOrder;
}
