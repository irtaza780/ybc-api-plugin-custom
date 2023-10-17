import SimpleSchema from "simpl-schema";
import ReactionError from "@reactioncommerce/reaction-error";
import _ from "lodash";

const CustomOrderPricing = new SimpleSchema({
  totalItemsPrice: Number,
  isTaxable: Boolean,
  tax: Number,
});

const inputSchema = new SimpleSchema({
  orderId: {
    type: String,
  },
  shopId: {
    type: String,
  },
  rejectionReason: {
    type: String,
    optional: true,
  },
  itemName: {
    type: String,
    optional: true,
  },
  phoneNumber: {
    type: String,
    optional: true,
  },
  quantity: {
    type: Number,
    optional: true,
  },
  details: {
    type: String,
    optional: true,
  },
  occasion: {
    type: String,
    optional: true,
  },
  fulfillmentDate: {
    type: Date,
    optional: true,
  },
  workflow: {
    type: String,
    optional: true,
  },
  pricing: {
    type: CustomOrderPricing,
    optional: true,
  },
});

export default async function updateCustomOrder(context, input) {
  inputSchema.validate(input);

  const { CustomOrders } = context.collections;

  const {
    orderId,
    shopId,
    itemName,
    phoneNumber,
    quantity,
    details,
    occasion,
    fulfillmentDate,
    rejectionReason,
    workflow,
    pricing,
  } = input;

  let updates = {};

  console.log("input ", input);

  if (typeof itemName === "string" || itemName !== null) {
    updates.itemName = itemName;
  }

  if (typeof phoneNumber === "string" || phoneNumber !== null) {
    updates.phoneNumber = phoneNumber;
  }

  if (typeof quantity === "number" || quantity !== null || quantity > 0) {
    console.log("quantity check type", typeof quantity);
    console.log("quantity check", quantity);
    updates.quantity = quantity;
  }

  if (typeof details === "string") {
    updates.details = details;
  }

  if (typeof occasion === "string") {
    updates.occasion = occasion;
  }

  if (typeof fulfillmentDate === "string") {
    updates.fulfillmentDate = fulfillmentDate;
  }

  if (typeof rejectionReason === "string") {
    updates.rejectionReason = rejectionReason;
  }

  if (typeof workflow === "string") {
    if (workflow === "rejected" && typeof rejectionReason !== "string") {
      throw new ReactionError(
        "invalid-argument",
        "Rejection reason is required "
      );
    }

    if (workflow === "approved" && _.isEmpty(pricing)) {
      throw new ReactionError(
        "invalid-argument",
        "pricing is required when approving order "
      );
    }

    // await context.validatePermissions(
    //   `reaction:legacy:shops:${shopId}`,
    //   "update",
    //   { shopId }
    // );

    updates.workflow = workflow;
  }

  if (typeof pricing === "object" || !_.isEmpty(pricing)) {
    updates.pricing = pricing;
  }

  if (Object.keys(updates).length === 0) {
    throw new ReactionError(
      "invalid-argument",
      "At least one field to update is required"
    );
  }

  const modifier = {
    $set: {
      ...updates,
      updatedAt: new Date(),
    },
  };

  const { value: updatedOrder } = await CustomOrders.findOneAndUpdate(
    {
      _id: orderId,
    },
    modifier,
    {
      returnOriginal: false,
    }
  );

  console.log("update custom order result is ", updatedOrder);

  return updatedOrder;
}
