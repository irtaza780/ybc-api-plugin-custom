import ReactionError from "@reactioncommerce/reaction-error";
import {
  decodeShopOpaqueId,
  encodeAccountOpaqueId,
  encodeShopOpaqueId,
  } from "../xforms/id.js";
import SimpleSchema from "simpl-schema";
import generateReferenceId from "../util/generateReferenceId.js";
import customOrderNotification from "../util/customOrderNotification.js";
import Random from "@reactioncommerce/random";

const inputSchema = new SimpleSchema({
  itemName: String,
  email: String,
  phoneNumber: String,
  quantity: Number,
  details: String,
  shopId: String,
  occasion: {
    type: String,
    optional: true,
  },
  fulfillmentDate: Date,
});

export default async function createCustomOrder(context, input) {
  inputSchema.validate(input);

  const { userId, authToken, collections } = context;

  const { CustomOrders, Shops } = collections;

  const {
    itemName,
    email,
    phoneNumber,
    quantity,
    details,
    shopId,
    fulfillmentDate,
  } = input;

  const decodedShopId = decodeShopOpaqueId(shopId);

  const shop = await Shops.findOne({ _id: decodedShopId });
  if (!shop) throw new ReactionError("access-denied", "Invalid Shop");

  if (!userId || !authToken)
    throw new ReactionError("access-denied", "Access Denied");

  const createdAt = new Date();
  const orderReference = generateReferenceId();

  const customOrder = {
    _id: Random.id(),
    itemName,
    referenceId: orderReference,
    email,
    phoneNumber,
    quantity,
    details,
    shopId: decodedShopId,
    orderBy: userId,
    createdAt,
    updatedAt: createdAt,
    fulfillmentDate,
    workflow: "created",
  };

  const createdOrder = await CustomOrders.insertOne(customOrder);

  // we will encode the account id and shop Id when sending it as response to client
  customOrder["orderBy"] = encodeAccountOpaqueId(userId);
  customOrder["shopId"] = encodeShopOpaqueId(decodedShopId);

  if (createdOrder?.result?.n > 0) {
    await customOrderNotification(
      context,
      shopId,
      decodedShopId,
      orderReference,
      //item name
      itemName,
      quantity,
      createdAt,
      fulfillmentDate
    );
  }

  return customOrder;
}
