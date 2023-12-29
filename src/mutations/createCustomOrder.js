import ReactionError from "@reactioncommerce/reaction-error";
import {
  decodeShopOpaqueId,
  encodeAccountOpaqueId,
  encodeShopOpaqueId,
  encodeOrderOpaqueId,
} from "../xforms/id.js";
import SimpleSchema from "simpl-schema";
import generateReferenceId from "../util/generateReferenceId.js";
// import customOrderNotification from "../util/customOrderNotification.js";
import Random from "@reactioncommerce/random";

const InspirationMediaInput = new SimpleSchema({
  large: String,
  medium: String,
  small: String,
  original: String,
  thumbnail: String,
});

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
  inspirationMedia: {
    type: Array,
    optional: true,
  },
  "inspirationMedia.$": {
    type: InspirationMediaInput,
  },
  fulfillmentDate: Date,
});

function isMediaNull(obj) {
  for (const key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      (obj[key] === null || obj[key] === "")
    ) {
      return true;
    }
  }
  return false;
}

export default async function createCustomOrder(context, input) {
  inputSchema.validate(input);

  const { userId, authToken, collections, appEvents } = context;

  const { CustomOrders, Shops } = collections;

  const {
    itemName,
    email,
    phoneNumber,
    quantity,
    details,
    shopId,
    fulfillmentDate,
    inspirationMedia,
  } = input;

  if (inspirationMedia) {
    const hasNullOrEmptyValues = inspirationMedia.some(isMediaNull);
    if (hasNullOrEmptyValues) {
      throw new ReactionError(
        "invalid-argument",
        "Inspiration Media cannot be empty"
      );
    }
  }

  const decodedShopId = decodeShopOpaqueId(shopId);

  const shop = await Shops.findOne({ _id: decodedShopId });
  if (!shop) throw new ReactionError("access-denied", "Invalid Shop");

  if (!userId || !authToken)
    throw new ReactionError("access-denied", "Invalid user or token");

  const createdAt = new Date();
  const orderReference = generateReferenceId();

  const customOrder = {
    _id: Random.id(),
    itemName,
    referenceId: orderReference,
    email: email.toLowerCase(),
    phoneNumber,
    quantity,
    details,
    shopId: decodedShopId,
    orderBy: userId,
    createdAt,
    updatedAt: createdAt,
    fulfillmentDate,
    workflow: "created",
    inspirationMedia,
    orderHistory: [details, fulfillmentDate, quantity],
  };

  const createdOrder = await CustomOrders.insertOne(customOrder);

  // we will encode the account id and shop Id when sending it as response to client
  customOrder["orderBy"] = encodeAccountOpaqueId(userId);
  customOrder["shopId"] = encodeShopOpaqueId(decodedShopId);

  if (createdOrder?.result?.n > 0) {
    // await customOrderNotification();
    const data = {
      shopId,
      decodedShopId,
      orderReference,
      itemName,
      quantity,
      createdAt,
      fulfillmentDate,
    };
    await appEvents.emit("afterCustomOrderCreate", data);
  }

  customOrder["_id"] = encodeOrderOpaqueId(customOrder._id);

  return customOrder;
}
